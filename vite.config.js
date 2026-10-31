import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Vercel runs /api as serverless functions in production; this mirrors those routes for `vite dev`.
function devApi() {
  const send = (res, status, data) => {
    res.statusCode = status
    res.end(JSON.stringify(data))
  }

  return {
    name: 'dev-api',
    configureServer(server) {
      server.middlewares.use('/api/interest', async (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' })
        try {
          let raw = ''
          for await (const chunk of req) raw += chunk
          const { saveInterest } = await server.ssrLoadModule('/lib/interest.js')
          const { status, data } = await saveInterest(JSON.parse(raw || '{}'))
          send(res, status, data)
        } catch (error) {
          console.error('Failed to save interest submission:', error)
          send(res, 500, { error: 'Something went wrong. Please try again.' })
        }
      })

      server.middlewares.use('/api/submissions', async (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Cache-Control', 'no-store')
        if (req.method !== 'GET') return send(res, 405, { error: 'Method not allowed' })
        try {
          const { listSubmissions } = await server.ssrLoadModule('/lib/submissions.js')
          const { status, data } = await listSubmissions(req.headers['x-admin-password'])
          send(res, status, data)
        } catch (error) {
          console.error('Failed to load submissions:', error)
          send(res, 500, { error: 'Could not load submissions.' })
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  for (const key of ['DATABASE_URL', 'ADMIN_PASSWORD']) {
    if (env[key] && !process.env[key]) process.env[key] = env[key]
  }
  return { plugins: [react(), devApi()] }
})
