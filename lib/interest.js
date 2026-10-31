import pg from 'pg'

const INTERESTS = ['tryouts', 'coaching', 'volunteering', 'sponsoring']
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

let pool
export function getPool() {
  pool ??= new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 3 })
  return pool
}

const clean = (value, maxLength) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : ''

export async function saveInterest(body) {
  const name = clean(body?.name, 120)
  const email = clean(body?.email, 254).toLowerCase()
  const playerAge = clean(body?.playerAge, 20)
  const interest = clean(body?.interest, 20)
  const message = clean(body?.message, 2000)

  if (!name) return { status: 400, data: { error: 'Please enter your name.' } }
  if (!EMAIL_PATTERN.test(email)) return { status: 400, data: { error: 'Please enter a valid email.' } }
  if (!INTERESTS.includes(interest)) return { status: 400, data: { error: 'Please choose an interest.' } }

  await getPool().query(
    'INSERT INTO interest_submissions (name, email, player_age, interest, message) VALUES ($1, $2, $3, $4, $5)',
    [name, email, playerAge || null, interest, message || null]
  )

  return { status: 201, data: { ok: true } }
}
