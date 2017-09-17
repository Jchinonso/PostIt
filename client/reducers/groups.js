import {
  CREATE_GROUP_SUCCESS,
  RECEIVE_GROUPS_SUCCESS,
} from '../constants/ActionTypes';


export default function groups(state = [], action) {
  switch (action.type) {
  case RECEIVE_GROUPS_SUCCESS: {
    return action.groups;
  }
  case CREATE_GROUP_SUCCESS: {
    return [...state, action.group];
  }
  default:
    return state;
  }
}
