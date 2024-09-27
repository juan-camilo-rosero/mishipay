import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Fallback a index.html para todas las rutas no encontradas (SPA)
    historyApiFallback: true,
  },
})
