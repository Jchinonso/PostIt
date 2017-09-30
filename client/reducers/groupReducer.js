import {
  CREATE_GROUP_FAILURE,
  CREATE_GROUP_SUCCESS,
  RECEIVE_GROUPS_SUCCESS,
  RECEIVE_GROUPS_FAILURE
} from '../constants/ActionTypes';

const intialState = {
  groups: [],
  errorMsg: '',
};
export default function groupReducer(state = intialState, action) {
  switch (action.type) {
  case RECEIVE_GROUPS_SUCCESS: {
    return { ...state, groups: action.groups };
  }
  case RECEIVE_GROUPS_FAILURE: {
    return { ...state, errorMsg: action.error };
  }
  case CREATE_GROUP_SUCCESS: {
    return { ...state, groups: [...state.groups, action.group] };
  }
  case CREATE_GROUP_FAILURE: {
    return { ...state, errorMsg: action.error };
  }
  default:
    return state;
  }
}
