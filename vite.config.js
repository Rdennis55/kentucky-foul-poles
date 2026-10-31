import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Vercel runs /api as serverless functions in production; this mirrors that route for `vite dev`.
function devApi() {
  return {
    name: 'dev-api',
    configureServer(server) {
      server.middlewares.use('/api/interest', async (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        if (req.method !== 'POST') {
          res.statusCode = 405
          return res.end(JSON.stringify({ error: 'Method not allowed' }))
        }
        try {
          let raw = ''
          for await (const chunk of req) raw += chunk
          const { saveInterest } = await server.ssrLoadModule('/lib/interest.js')
          const { status, data } = await saveInterest(JSON.parse(raw || '{}'))
          res.statusCode = status
          res.end(JSON.stringify(data))
        } catch (error) {
          console.error('Failed to save interest submission:', error)
          res.statusCode = 500
          res.end(JSON.stringify({ error: 'Something went wrong. Please try again.' }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  process.env.DATABASE_URL ??= env.DATABASE_URL
  return { plugins: [react(), devApi()] }
})
