import Axios from 'axios';
import * as types from '../constants/actionTypes';

const apiUrl = 'http://localhost:3000/soldiers'

const fetchSoldiersSuccess = (soldiers) => {
  return {
    type: types.FETCH_SOLDIERS_SUCCESS,
    soldiers
  };
}

export const fetchSoldiers = () => {
  return (dispatch) => {
    return Axios.get(apiUrl)
      .then(res => {
        dispatch(fetchSoldiersSuccess(res.data));
      })
      .catch(e => { throw(e) });
  }
}
