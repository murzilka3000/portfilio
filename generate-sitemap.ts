import { SitemapStream } from 'sitemap';
import { createWriteStream, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);

// URL вашего сайта
const BASE_URL = 'https://murzilkashop.ru/';

// Массив с URL-адресами страниц и якорными ссылками вашего лендинга
const pages = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/#work', changefreq: 'monthly', priority: 0.8 },
  { url: '/#review', changefreq: 'monthly', priority: 0.8 },
  { url: '/#contact', changefreq: 'monthly', priority: 0.8 },
  // Добавьте другие страницы и якорные ссылки вашего лендинга
];

// Получаем текущий каталог
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Создаем директорию, если она не существует
const outputDir = resolve(__dirname, 'public');
mkdirSync(outputDir, { recursive: true });

// Создаем поток для записи карты сайта
const sitemapStream = new SitemapStream({ hostname: BASE_URL });

// Записываем карту сайта в файл
const writeStream = createWriteStream(resolve(outputDir, 'sitemap.xml'));

async function generateSitemap() {
  try {
    // Добавляем страницы в карту сайта
    pages.forEach(page => sitemapStream.write(page));

    // Завершаем поток
    sitemapStream.end();

    // Генерируем карту сайта
    await pipelineAsync(
      sitemapStream,
      writeStream
    );

    console.log('Карта сайта успешно создана!');
  } catch (err) {
    console.error('Ошибка при создании карты сайта:', err);
  }
}

generateSitemap();