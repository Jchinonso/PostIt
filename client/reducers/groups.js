import {
  CREATE_GROUP_SUCCESS,
  RECEIVE_GROUPS_SUCCESS,
} from '../constants/ActionTypes';


export default function groups(state = [], action) {
  switch (action.type) {
  case CREATE_GROUP_SUCCESS:
    return [...state, action.group];
  case RECEIVE_GROUPS_SUCCESS:
    return action.groups;
  default:
    return state;
  }
}
