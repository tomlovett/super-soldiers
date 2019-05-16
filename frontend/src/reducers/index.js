import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import { missions } from './missionReducers';

const rootReducer = history => combineReducers({
  missions: missions,
  router: connectRouter(history),
});

export default rootReducer;
