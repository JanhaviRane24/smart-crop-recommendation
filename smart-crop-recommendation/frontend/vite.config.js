import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,     // Expose dev server to your local network
    port: 5173      // (optional, but ensures consistent port)
  }
})
