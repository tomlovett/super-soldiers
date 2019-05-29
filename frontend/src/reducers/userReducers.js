import * as types from '../constants/actionTypes';

const hasToken = { token: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NTkyMzUxMzJ9.KIPcQgi6GYFq0c8v2WijeX73ajifj3xTeWvDXhDjQhc" }

const fullUser = {
  id: 1,
  email: 'c@work.com',
  name: 'Commander',
  token: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NTkyMzUxMzJ9.KIPcQgi6GYFq0c8v2WijeX73ajifj3xTeWvDXhDjQhc"
};

// export const user = (state = {}, action) => {
// export const user = (state = hasToken, action) => {
export const user = (state = fullUser, action) => {
  switch (action.type) {
    case types.AUTH_SUCCESS:
      return Object.assign({}, {token: action.token}, state);
    default:
      return state;
  }
}
