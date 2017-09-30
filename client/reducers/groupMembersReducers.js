import {
  FETCH_GROUP_MEMBERS_SUCCESS
} from '../constants/ActionTypes';

const intialState = {
  members: []
};
export default function groupMembersReducer(state = intialState, action) {
  switch (action.type) {
  case FETCH_GROUP_MEMBERS_SUCCESS: {
    return { ...state,
      members: action.members
    };
  }
  default:
    return state;
  }
}
