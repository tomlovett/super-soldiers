import * as types from '../constants/actionTypes'

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2ODk3ODA4MjN9.C6C_AElqMsEKBEHCRaAtmxkqrNdtyt6FB4xE_t_IbiE'

const hasToken = { token }

const fullUser = {
	id: 1,
	email: 'c@work.com',
	name: 'Commander',
	token
}

// export const user = (state = {}, action) => {
// export const user = (state = hasToken, action) => {
export const user = (state = fullUser, action) => {
	switch (action.type) {
	case types.AUTH_SUCCESS:
		return Object.assign({}, {token: action.token}, state)
	case types.LOGOUT:
		return {}
	default:
		return state
	}
}
