const API_URL = 'http://localhost:3000/jobs'

async function request(url, options) {
  const response = await fetch(url, options)
  if (!response.ok) throw new Error(`Erreur serveur (${response.status})`)
  if (response.status === 204) return null
  return response.json()
}

export const getJobs = () => request(API_URL)
export const getJob = (id) => request(`${API_URL}/${encodeURIComponent(id)}`)
export const createJob = (job) => request(API_URL, {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(job)
})
export const updateJob = (id, job) => request(`${API_URL}/${encodeURIComponent(id)}`, {
  method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(job)
})
export const deleteJob = (id) => request(`${API_URL}/${encodeURIComponent(id)}`, { method: 'DELETE' })
