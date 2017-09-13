import { SET_CURRENT_USER } from '../constants/ActionTypes';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function currentUser(state = initialState, action = {}) {
  switch (action.type) {
  case SET_CURRENT_USER:
    return {
      isAuthenticated: true,
      user: action.user
    };
  default:
    return state;
  }
}
