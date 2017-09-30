import { combineReducers } from 'redux';
import authReducer from './authReducer';
import activeGroupReducer from './activeGroupReducer';
import groupReducer from './groupReducer';
import groupMessagesReducer from './groupMessagesReducer';
import membersReducer from './membersReducer';
import groupMembersReducer from './groupMembersReducers';
import { SIGNOUT_USER_SUCCESS } from '../constants/ActionTypes';

const appReducer = combineReducers({
  authReducer,
  membersReducer,
  activeGroupReducer,
  groupMessagesReducer,
  groupMembersReducer,
  groupReducer
});

const rootReducer = (state, action) => {
  if (action.type === SIGNOUT_USER_SUCCESS) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
