/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5294',
        changeOrigin: true,
      }
    },
    port: 8080
  },
  resolve: {
    alias: {
      '@ems': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    root: 'src/',
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],
    watch: true
  }
})
