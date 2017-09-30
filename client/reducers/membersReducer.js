import {
  ADD_MEMBERS_SUCCESS,
  ADD_MEMBERS_FAILURE,
  FETCH_USER_SUCCESS,
} from '../constants/ActionTypes';

const intialState = {
  successMsg: '',
  errorMsg: '',
  users: [],
};
export default function addMembersReducer(state = intialState, action) {
  switch (action.type) {
  case ADD_MEMBERS_SUCCESS: {
    return { ...state, successMsg: action.message };
  }
  case ADD_MEMBERS_FAILURE: {
    return { ...state, errorMsg: action.error };
  }
  case FETCH_USER_SUCCESS: {
    return { ...state,
      users: action.users
    };
  }
  default:
    return state;
  }
}
