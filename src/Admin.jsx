import { useState } from 'react'
import { Download, Lock, LogOut, RefreshCw } from 'lucide-react'

const COLUMNS = [
  ['created_at', 'Received'],
  ['name', 'Name'],
  ['email', 'Email'],
  ['player_age', 'Player age'],
  ['interest', 'Interest'],
  ['message', 'Message'],
]

const formatDate = (value) =>
  new Date(value).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })

function csvCell(value) {
  let text = value == null ? '' : String(value)
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`
  return `"${text.replace(/"/g, '""')}"`
}

function downloadCsv(rows) {
  const header = COLUMNS.map(([, label]) => csvCell(label)).join(',')
  const body = rows.map((row) => COLUMNS.map(([key]) => csvCell(row[key])).join(','))
  const blob = new Blob([[header, ...body].join('\r\n')], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `foul-poles-interest-${new Date().toISOString().slice(0, 10)}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

async function fetchSubmissions(password) {
  const res = await fetch('/api/submissions', { headers: { 'x-admin-password': password } })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Could not load submissions.')
  return data.submissions
}

export default function Admin() {
  const [password, setPassword] = useState('')
  const [submissions, setSubmissions] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function load(event) {
    event?.preventDefault()
    setLoading(true)
    setError('')
    try {
      setSubmissions(await fetchSubmissions(password))
    } catch (err) {
      setError(err.message)
      setSubmissions(null)
    } finally {
      setLoading(false)
    }
  }

  function signOut() {
    setPassword('')
    setSubmissions(null)
    setError('')
  }

  if (!submissions) {
    return (
      <main className="admin admin-login">
        <form className="admin-card" onSubmit={load}>
          <div className="brand-mark" aria-hidden="true">KFP</div>
          <h1>Interest submissions</h1>
          <p>Enter the admin password to view form entries.</p>
          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button blue" type="submit" disabled={loading || !password}>
            <Lock size={18} aria-hidden="true" />
            {loading ? 'Checking...' : 'View submissions'}
          </button>
          <a className="admin-back" href="/">Back to site</a>
        </form>
      </main>
    )
  }

  return (
    <main className="admin">
      <header className="admin-header">
        <div className="container admin-header-inner">
          <div>
            <h1>Interest submissions</h1>
            <p>{submissions.length} {submissions.length === 1 ? 'entry' : 'entries'}</p>
          </div>
          <div className="admin-actions">
            <button className="button admin-ghost" type="button" onClick={() => load()} disabled={loading}>
              <RefreshCw size={18} aria-hidden="true" /> {loading ? 'Refreshing...' : 'Refresh'}
            </button>
            <button className="button yellow" type="button" onClick={() => downloadCsv(submissions)} disabled={!submissions.length}>
              <Download size={18} aria-hidden="true" /> Export CSV
            </button>
            <button className="button admin-ghost" type="button" onClick={signOut}>
              <LogOut size={18} aria-hidden="true" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <section className="container admin-body">
        {error && <p className="form-error" role="alert">{error}</p>}
        {submissions.length === 0 ? (
          <p className="admin-empty">No submissions yet. New entries from the interest form will show up here.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>{COLUMNS.map(([key, label]) => <th key={key} scope="col">{label}</th>)}</tr>
              </thead>
              <tbody>
                {submissions.map((row) => (
                  <tr key={row.id}>
                    <td className="nowrap">{formatDate(row.created_at)}</td>
                    <td>{row.name}</td>
                    <td><a href={`mailto:${row.email}`}>{row.email}</a></td>
                    <td>{row.player_age || '-'}</td>
                    <td><span className="admin-tag">{row.interest}</span></td>
                    <td className="admin-message">{row.message || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}
