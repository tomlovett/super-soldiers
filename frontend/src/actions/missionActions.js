import Axios from 'axios';
import * as types from '../constants/actionTypes';
import * as api from '../constants/api';

export const addMission = (mission, token) => {
  const headers = api.authHeader(token);

  return (dispatch) => {
    return Axios.post(api.missions, mission, headers)
      .then(res => {
        if (res.status === 201) {
          dispatch(fetchMissions());
        }
      })
      .catch(e => {throw(e)});
  }
}

const fetchMissionsSuccess = (missions) => {
  return {
    type: types.FETCH_MISSIONS_SUCCESS,
    missions
  }
}

export const fetchMissions = (token) => {
  const headers = api.authHeader(token);

  return (dispatch) => {
    return Axios.get(api.missions, headers)
      .then(res => {
        dispatch(fetchMissionsSuccess(res.data))
      })
      .catch(e => {throw(e)});
  }
}
