import { createHash, timingSafeEqual } from 'node:crypto'
import { getPool } from './interest.js'

const digest = (value) => createHash('sha256').update(String(value)).digest()

function isAuthorized(password) {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected || typeof password !== 'string' || !password) return false
  return timingSafeEqual(digest(password), digest(expected))
}

export async function listSubmissions(password) {
  if (!process.env.ADMIN_PASSWORD) {
    return { status: 503, data: { error: 'Admin access is not set up yet. Add ADMIN_PASSWORD to the project.' } }
  }
  if (!isAuthorized(password)) {
    return { status: 401, data: { error: 'Incorrect password.' } }
  }

  const { rows } = await getPool().query(
    'SELECT id, name, email, player_age, interest, message, created_at FROM interest_submissions ORDER BY created_at DESC LIMIT 1000'
  )
  return { status: 200, data: { submissions: rows } }
}
