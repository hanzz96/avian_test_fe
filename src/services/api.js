const BASE_URL = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api').replace(/\/$/, '')

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}`, { headers: { Accept: 'application/json' } })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(body.message || `Request failed (${res.status})`)
  return body
}

export const fetchDashboard = () => request('/dashboard')
