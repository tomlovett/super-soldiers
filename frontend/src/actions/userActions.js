import Axios from 'axios';
import * as types from '../constants/actionTypes';
import * as api from '../constants/api';

const authSuccess = (token) => {
  return {
    type: types.AUTH_SUCCESS,
    token
  }
}

export function authenticate(user, isLogin) {
  const authUrl = isLogin ? api.login : api.register;

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
  const headers = api.authHeader(token);

  return function(dispatch) {
    return Axios.get(api.self, headers)
      .then(res => {
        dispatch(querySelfSuccess(res.data));

        return res.data.id;
      })
      .catch(e => { throw(e) });
  }
}
