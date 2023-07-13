import * as types from '../constants/actionTypes'

export const soldiers = (state = [], action) => {
	switch (action.type) {
	case types.FETCH_SOLDIERS_SUCCESS:
		return action.soldiers
	default:
		return state
	}
}
