import { combineReducers } from 'redux';
import auth from './auth';
import activeGroup from './activeGroup';
import groups from './groups';
import activeGroupmessages from './activeGroupmessages';

const rootReducer = combineReducers({
  auth,
  activeGroup,
  activeGroupmessages,
  groups
});

export default rootReducer;
