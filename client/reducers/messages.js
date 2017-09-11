import {
  ADD_MESSAGE,
  RECEIVE_MESSAGE,
  LOAD_MESSAGES,
  LOAD_MESSAGES_SUCCESS,
  LOAD_MESSAGES_FAIL,
} from '../constants/ActionTypes';

const initialState = {
  loaded: false,
  data: [],
  fetchHistory: []
};
export default function messages(state = initialState, action) {
  switch (action.type) {
  case ADD_MESSAGE:
    return { ...state,
      data: [...state.data, action.message]
    };
  case RECEIVE_MESSAGE:
    return { ...state,
      data: [...state.data, action.message]
    };
  case LOAD_MESSAGES:
    return { ...state,
      loading: true
    };
  case LOAD_MESSAGES_SUCCESS:
    return { ...state,
      loading: false,
      loaded: true,
      fetchHistory: [...state.fetchHistory, { lastFetch: action.date, groupName: action.group }],
      data: [...state.data.filter(message => message.groupId !== action.group), ...action.json]
    };
  default:
    return state;
  }
}