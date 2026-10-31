import { listSubmissions } from '../lib/submissions.js'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { status, data } = await listSubmissions(req.headers['x-admin-password'])
    return res.status(status).json(data)
  } catch (error) {
    console.error('Failed to load submissions:', error)
    return res.status(500).json({ error: 'Could not load submissions.' })
  }
}
