import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      '/audius-api': {
        target: 'https://api.audius.co',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/audius-api/, '')
      },
      '/audius-discovery': {
        target: 'https://discoveryprovider.audius.co',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/audius-discovery/, '')
      }
    }
  }
})


