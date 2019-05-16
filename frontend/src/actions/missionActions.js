import Axios from 'axios';
import * as types from '../constants/actionTypes'

const apiUrl = 'localhost:3000/missions'

export const addMission = (mission) => {
  return (dispatch) => {
    return Axios.post(apiUrl, mission)
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

export const fetchMissions = () => {
  return (dispatch) => {
    return Axios.get(apiUrl)
      .then(res => {
        dispatch(fetchMissionsSuccess(res.data))
      })
      .catch(e => {throw(e)});
  }
}
