import * as types from '../constants/actionTypes';

const hasToken = { token: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NTg4NzkzOTJ9.0cZAvRYRRH1O0hImOgysPsb06NGRghhby-vvZuIkh1Q" }

// export const user = (state = {}, action) => {
export const user = (state = hasToken, action) => {
  switch (action.type) {
    case types.AUTH_SUCCESS:
      return Object.assign({}, {token: action.token}, state);
    default:
      return state;
  }
}
