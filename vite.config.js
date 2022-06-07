import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    '__APP_VERSION__': JSON.stringify(process.env.npm_package_version),
  },
  server: {
    proxy: {
      '/down': {
        target: 'https://wkla.no-ip.biz/',
        changeOrigin: true,
        secure: false
      },
      cors: false
    },
  }
})
