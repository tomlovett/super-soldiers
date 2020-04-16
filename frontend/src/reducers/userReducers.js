import * as types from '../constants/actionTypes';

const hasToken = { token: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NTk2NTUxNjB9.ISaeK7eKBv8ff95RnkCsT-ruxtsTo8P4DoBfNy4KvT8" }

const fullUser = {
  id: 1,
  email: 'c@work.com',
  name: 'Commander',
  token: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NTk2NTUxNjB9.ISaeK7eKBv8ff95RnkCsT-ruxtsTo8P4DoBfNy4KvT8"
};

export const user = (state = {}, action) => {
// export const user = (state = hasToken, action) => {
// export const user = (state = fullUser, action) => {
  switch (action.type) {
    case types.AUTH_SUCCESS:
      return Object.assign({}, {token: action.token}, state);
		case types.LOGOUT:
			return {};
    default:
      return state;
  }
}
