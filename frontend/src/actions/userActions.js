import Axios from 'axios';
import * as types from '../constants/actionTypes';

const authSuccess = (token) => {
  return {
    type: types.AUTH_SUCCESS,
    token
  }
}

export function authenticate(user, isLogin) {
  const authUrl = isLogin ? 'http://localhost:3000/auth/login' : 'http://localhost:3000/signup'

  return function(dispatch) {
    return Axios.post(authUrl, user)
      .then(res => {
        const token = res.data.auth_token;

        dispatch(authSuccess(token))
        return token;
      })
      .catch(e => { throw(e) });
  }
}

function querySelfSuccess(user) {
  return {
    type: types.QUERY_SELF_SUCCESS,
    user
  }
}

export function querySelf(token) {
  const usersUrl = 'http://localhost:3000/self';
  const headers = { headers: { 'Authorization': token }};

  return function(dispatch) {
    return Axios.get(`${usersUrl}`, headers)
      .then(res => {
        dispatch(querySelfSuccess(res.data));

        return res.data.id;
      })
      .catch(e => { throw(e) });
  }
}
