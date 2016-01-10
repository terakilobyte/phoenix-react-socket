import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import chartdata from './chartdata';

export default combineReducers({
  chartdata,
  router: routeReducer
});
