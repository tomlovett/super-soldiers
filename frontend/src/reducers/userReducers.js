import * as types from '../constants/actionTypes';

const hasToken = { token: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NTg0NTQ3OTJ9.uUYv6iAG3VK5cfDE3SQRJ0squUONoxeG7vVkMzgrZfw"}

// export const user = (state = {}, action) => {
export const user = (state = hasToken, action) => {
  switch (action.type) {
    case types.AUTH_SUCCESS:
      return Object.assign({}, {token: action.token}, state);
    default:
      return state;
  }
}
