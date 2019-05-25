import * as types from '../constants/actionTypes';

const hasToken = { token: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NTg2MzEzOTd9.iGNZ5StIqeji5fpAuUuJ3POebjdgJREzYT3tLTdnw08" }

// export const user = (state = {}, action) => {
export const user = (state = hasToken, action) => {
  switch (action.type) {
    case types.AUTH_SUCCESS:
      return Object.assign({}, {token: action.token}, state);
    default:
      return state;
  }
}
