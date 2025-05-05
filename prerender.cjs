// prerender.js
const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');
const fs = require('fs-extra'); // Используем fs-extra для ensureDir
// Убедитесь, что экспорт по умолчанию корректно импортируется
const routesToPrerender = require('./src/routesToPrerender.js').default;

const PORT = 4005; // Убедитесь, что порт свободен
const BUILD_DIR = path.resolve(__dirname, 'dist');
const WAIT_FOR_SELECTOR = 'main'; // Селектор для ожидания. Убедитесь, что он появляется ПОСЛЕ рендеринга основного контента.
const PAGE_LOAD_TIMEOUT = 60000; // 60 секунд на загрузку страницы
const SELECTOR_TIMEOUT = 10000; // 10 секунд на ожидание селектора

async function prerender() {
  console.log('🚀 Starting pre-rendering...');
  console.log(`Source build directory: ${BUILD_DIR}`);
  console.log(`Routes to prerender: ${routesToPrerender.join(', ')}`);

  if (!fs.existsSync(BUILD_DIR) || !fs.existsSync(path.join(BUILD_DIR, 'index.html'))) {
      console.error(`❌ Error: Build directory '${BUILD_DIR}' or '${path.join(BUILD_DIR, 'index.html')}' not found!`);
      console.error("Ensure 'vite build' completed successfully before running prerender.");
      return;
  }

  // --- 1. Запуск локального сервера ---
  const app = express();
  app.use(express.static(BUILD_DIR));
  // Важно: Обработчик для SPA, чтобы все пути вели на index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(BUILD_DIR, 'index.html'));
  });

  let server;
  try {
    server = await new Promise((resolve, reject) => {
        const s = app.listen(PORT, () => {
            console.log(`✅ Build served locally on http://localhost:${PORT}`);
            resolve(s);
        });
        s.on('error', (err) => {
            console.error(`❌ Failed to start local server on port ${PORT}. Is the port already in use?`);
            reject(err);
        });
    });
  } catch (error) {
      console.error('Server failed to start:', error);
      return; // Не можем продолжать без сервера
  }


  // --- 2. Запуск Puppeteer ---
  console.log('🚀 Launching Puppeteer...');
  const browser = await puppeteer.launch({
    headless: 'new', // Рекомендуемый новый headless режим
    args: ['--no-sandbox', '--disable-setuid-sandbox'], // Опции для совместимости (особенно в CI/Docker)
    timeout: PAGE_LOAD_TIMEOUT,
  });
  console.log('✅ Puppeteer browser launched.');

  try {
    // --- 3. Пререндеринг каждого роута ---
    for (const route of routesToPrerender) {
      console.log(`\nProcessing route: ${route}`);
      const page = await browser.newPage();

      // ВАЖНО: Добавляем слушателей ДО навигации
      page.on('console', msg => {
          const type = msg.type().toUpperCase();
          const text = msg.text();
          // Логируем ошибки и предупреждения из консоли страницы
          if (type === 'ERROR' || type === 'WARNING') {
            console.warn(`🖥️ PAGE CONSOLE [${type}] (${route}): ${text}`);
          }
          // Можно раскомментировать для отладки, чтобы видеть все логи
          // else { console.log(`🖥️ PAGE CONSOLE [${type}] (${route}): ${text}`); }
      });
      page.on('pageerror', error => {
          // Логируем неперехваченные исключения на странице
          console.error(`❌ PAGE JAVASCRIPT ERROR (${route}):`, error.message);
      });

      const url = `http://localhost:${PORT}${route}`;
      console.log(`Navigating to ${url}...`);

      try {
        // Переходим на страницу
        await page.goto(url, {
          waitUntil: 'networkidle0', // Ждем, пока сетевая активность не прекратится
          timeout: PAGE_LOAD_TIMEOUT
        });
        console.log(`✅ Navigation to ${url} successful.`);

        // Ждем появления ключевого элемента
        console.log(`Waiting for selector '${WAIT_FOR_SELECTOR}' (max ${SELECTOR_TIMEOUT}ms)...`);
        try {
            await page.waitForSelector(WAIT_FOR_SELECTOR, {
                timeout: SELECTOR_TIMEOUT
            });
            console.log(`✅ Selector '${WAIT_FOR_SELECTOR}' found.`);
        } catch (selectorError) {
            console.warn(`⚠️ Warning: Selector '${WAIT_FOR_SELECTOR}' not found within ${SELECTOR_TIMEOUT}ms.`);
            // Можно добавить скриншот для отладки
            // const screenshotPath = path.join(__dirname, `prerender_error_${route.replace('/', '_') || 'root'}.png`);
            // await page.screenshot({ path: screenshotPath });
            // console.warn(`📸 Screenshot saved to ${screenshotPath}`);
            // Продолжаем, но контент может быть неполным
        }

        // Получаем отрендеренный HTML
        console.log('Fetching page content...');
        const content = await page.content();
        console.log(`✅ Content fetched for ${url}. Size: ${content.length} bytes.`);

        // ВЫВОДИМ СНИППЕТ КОНТЕНТА ДЛЯ ПРОВЕРКИ
        const contentSnippet = content.replace(/\s\s+/g, ' ').substring(0, 600); // Убираем лишние пробелы для читаемости
        console.log(`\n--- Content Snippet (${route}) ---\n${contentSnippet}...\n-----------------------------\n`);

        // ПРОВЕРКА на пустой #root
         if (content.includes('<div id="root"></div>')) {
             console.warn(`⚠️ WARNING: Fetched content for ${route} seems to contain an empty <div id="root">!`);
             console.warn("   This might indicate a client-side rendering error or the WAIT_FOR_SELECTOR appeared too early.");
         } else if (content.includes('<div id="root">') && !content.includes('</div>', content.indexOf('<div id="root">'))) {
              console.warn(`⚠️ WARNING: Found <div id="root"> but it seems unclosed or empty.`);
         } else if (content.includes('<div id="root">')) {
             console.log(`✅ <div id="root"> seems populated.`);
         } else {
              console.warn(`⚠️ WARNING: <div id="root"> not found in the fetched content.`);
         }


        // Определяем путь для сохранения файла
        // Для роута '/' сохраняем в dist/index.html
        const routePath = route === '/' ? '' : route.startsWith('/') ? route.substring(1) : route;
        const filePath = path.join(BUILD_DIR, routePath, 'index.html');
        const dirPath = path.dirname(filePath);

        console.log(`Ensuring directory exists: ${dirPath}`);
        await fs.ensureDir(dirPath); // Создаем директорию, если её нет

        console.log(`Attempting to save prerendered HTML to: ${filePath}`);
        await fs.writeFile(filePath, content);
        console.log(`✅ Successfully saved: ${filePath}`);

      } catch (error) {
        console.error(`❌ Failed to process route ${route}:`, error);
        // Можно добавить скриншот и сюда
        // const screenshotPath = path.join(__dirname, `prerender_fatal_error_${route.replace('/', '_') || 'root'}.png`);
        // try { await page.screenshot({ path: screenshotPath }); console.log(`📸 Screenshot saved to ${screenshotPath}`); } catch (e) {}

      } finally {
        if (page) await page.close();
        console.log(`Closed page for route: ${route}`);
      }
    } // Конец цикла for

  } catch (error) {
    console.error('❌ Error during the main pre-rendering process:', error);
  } finally {
    // --- 4. Очистка ---
    if (browser) {
      await browser.close();
      console.log('✅ Puppeteer browser closed.');
    }
    if (server) {
       console.log(`Stopping local server on port ${PORT}...`);
       await new Promise((resolve, reject) => {
           server.close((err) => {
               if (err) {
                   console.error('❌ Error stopping local server:', err);
                   return reject(err);
               }
               console.log(`✅ Local server on port ${PORT} stopped.`);
               resolve();
           });
       });
    }
    console.log('🏁 Pre-rendering finished.');
  }
}

// Запускаем функцию пререндеринга
prerender().catch(error => {
    console.error("💥 Unhandled error during prerender execution:", error);
    process.exit(1); // Выходим с кодом ошибки
});