const baseApi = 'http://localhost:3000'

// Headers
export const authHeader = (token) => ({ headers: { 'Authorization': `Token ${token}` } })

// User
export const login = `${baseApi}/login`
export const register = `${baseApi}/users`
export const self = `${baseApi}/self`

// Missions
export const missions = `${baseApi}/missions`
export const mission = (mission) => `${baseApi}/missions/${mission.id}`

// Soldiers
export const soldiers = `${baseApi}/soldiers`
