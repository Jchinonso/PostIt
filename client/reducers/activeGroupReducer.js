import {
  SELECT_GROUP
} from '../constants/ActionTypes';

export default function activeGroupReducer(state = null, action) {
  switch (action.type) {
  case SELECT_GROUP: {
    return action.groupId;
  }
  default:
    return state;
  }
}
