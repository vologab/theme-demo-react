import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import error from './error';
import person from './person';
import personsList from './personsList';

const rootReducer = combineReducers({
  auth,
  error,
  person,
  personsList,
  routing: routerReducer
});

export default rootReducer;
