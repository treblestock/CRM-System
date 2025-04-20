import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': path.join(import.meta.dirname, 'src'),
      '~css': path.join(import.meta.dirname, 'src', 'assets', 'css')
    }
  },
  plugins: [vue()],
})
