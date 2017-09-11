import { combineReducers } from 'redux';
import auth from './auth';
import activeGroup from './activeGroup';
import groups from './groups';
import messages from './messages';

const rootReducer = combineReducers({
  auth,
  activeGroup,
  messages,
  groups
});

export default rootReducer;
