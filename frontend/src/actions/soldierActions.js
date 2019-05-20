import Axios from 'axios';
import * as types from '../constants/actionTypes';
import * as api from '../constants/api';


const fetchSoldiersSuccess = (soldiers) => {
  return {
    type: types.FETCH_SOLDIERS_SUCCESS,
    soldiers
  };
}

export const fetchSoldiers = (token) => {
  const headers = api.authHeader(token);
  
  return (dispatch) => {
    return Axios.get(api.soldiers, headers)
      .then(res => dispatch(fetchSoldiersSuccess(res.data)) )
      .catch(e => { throw(e) });
  }
}
