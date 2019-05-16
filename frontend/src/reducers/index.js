import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import { missions } from './missionReducers';
import { soldiers } from './soldierReducers';
import { user } from './userReducers';

const rootReducer = history => combineReducers({
  missions,
  soldiers,
  user,
  router: connectRouter(history),
});

export default rootReducer;
