import { combineReducers } from 'redux';
import auth from './auth';
import activeGroup from './activeGroup';
import groups from './groups';
import activeGroupmessages from './activeGroupmessages';
import { SIGNOUT_SUCCESS } from '../constants/ActionTypes';

const appReducer = combineReducers({
  auth,
  activeGroup,
  activeGroupmessages,
  groups
});

const rootReducer = (state, action) => {
  if (action.type === SIGNOUT_SUCCESS) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
