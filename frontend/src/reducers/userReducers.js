import * as types from '../constants/actionTypes';

const hasToken = { token: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NTkxNDg1ODZ9.VCp5cW1KxhftDBR4_nfKpTeraaWdRBhFtaTy3hRG9S8" }

// export const user = (state = {}, action) => {
export const user = (state = hasToken, action) => {
  switch (action.type) {
    case types.AUTH_SUCCESS:
      return Object.assign({}, {token: action.token}, state);
    default:
      return state;
  }
}
