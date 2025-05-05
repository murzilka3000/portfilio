import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Добавляем эту секцию:
  build: {
    // Устанавливаем целевую среду JavaScript.
    // 'es2020' поддерживает операторы ?. и ??,
    // и Vite/esbuild преобразует более новый синтаксис
    // (или этот же синтаксис, если целевая среда его не поддерживает)
    // в совместимый код.
    target: 'es2019',
  },
})