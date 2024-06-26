// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import { resolve, dirname } from 'node:path'
// import { fileURLToPath } from 'url'
// import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// // https://vitejs.dev/config/
// export default defineConfig({
//   server: {
//     host: 'localhost',
//     port: 3000,
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5173',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//     },
//   },
//   resolve: {
//     alias: {
//       '@': resolve(__dirname, 'src'),
//     },
//   },
//   build: {
//     sourcemap: true,
//   },
//   plugins: [
//     vue(),
//     VueI18nPlugin({
//       include: resolve(dirname(fileURLToPath(import.meta.url)), './src/i18n/locales/**'),
//     }),
//   ],
// })
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5173',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(fileURLToPath(import.meta.url), '..', 'src'),
    },
  },
  build: {
    sourcemap: true,
  },
  plugins: [
    vue(),
    VueI18nPlugin({
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/i18n/locales/**'),
    }),
  ],
})
