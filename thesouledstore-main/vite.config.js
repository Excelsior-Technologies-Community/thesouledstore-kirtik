import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// BUG FIX ✅ — was port 3000, now matches package.json "dev" script port 3003
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3003,
    open: true,
    host: true,
  }
})
