import * as types from '../constants/actionTypes';

export const missions = (state = [], action) => {
  switch (action.type) {
    case types.ADD_MISSION:
      return [
        ...state,
        action.mission
      ];
    case types.FETCH_MISSIONS_SUCCESS:
      return action.missions;
    default:
      return state;
  }
}
