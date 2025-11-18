import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'health-endpoint',
      configureServer(server) {
        server.middlewares.use('/health', (req, res) => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ status: 'ok' }))
        })
      },
      configurePreviewServer(server) {
        server.middlewares.use('/health', (req, res) => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ status: 'ok' }))
        })
      }
    }
  ],
  server: {
    host: true, // bind to 0.0.0.0
    port: Number(process.env.PORT) || 5173,
    strictPort: false, // allow fallback to the next free port
    open: false,
  },
  preview: {
    host: true,
    port: Number(process.env.PORT) || 5173,
    strictPort: false,
    open: false,
  }
})
