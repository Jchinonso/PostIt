import {
  CHANGE_GROUP,
  ADD_GROUP,
  RECEIVE_GROUP,
  LOAD_GROUPS,
  LOAD_GROUPS_SUCCESS,
  LOAD_GROUPS_FAIL,
} from '../constants/ActionTypes';

const initialState = {
  loaded: false,
  data: []
};

export default function groups(state = initialState, action) {
  switch (action.type) {
  case ADD_GROUP:
    if (state.data.filter(group => group.name === action.group.name).length !== 0) {
      return state;
    }
    return { ...state,
      data: [...state.data, action.group]
    };
  case LOAD_GROUPS:
    return { ...state,
      loading: true
    };
  case LOAD_GROUPS_SUCCESS:
    return { ...state,
      loading: false,
      loaded: true,
      data: [...state.data, ...action.groups]
    };
  default:
    return state;
  }
}
