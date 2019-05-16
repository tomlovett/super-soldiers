import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import { missions } from './missionReducers';
import { soldiers } from './soldierReducers';

const rootReducer = history => combineReducers({
  missions,
  soldiers,
  router: connectRouter(history),
});

export default rootReducer;
