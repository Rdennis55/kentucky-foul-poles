import { saveInterest } from '../lib/interest.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const { status, data } = await saveInterest(body)
    return res.status(status).json(data)
  } catch (error) {
    console.error('Failed to save interest submission:', error)
    return res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
}
