const baseApi = 'http://localhost:3000';

// Headers
export const authHeader = (token) => {
  return {
    headers: { 'Authorization': token }
  };
}

// User
export const login = `${baseApi}/auth/login`;
export const register = `${baseApi}/users`;
export const self = `${baseApi}/self`;

// Missions
export const missions = `${baseApi}/missions`;

// Soldiers
export const soldiers = `${baseApi}/soldiers`;
