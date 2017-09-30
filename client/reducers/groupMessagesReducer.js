import {
GET_GROUP_MESSAGES_SUCCESS,
ADD_MESSAGE_TO_GROUP_SUCCESS
} from '../constants/ActionTypes';

const initialState = {
  messages: [],
};

export default function groupMessagesReducer(state = initialState, action){
  switch (action.type) {
  case GET_GROUP_MESSAGES_SUCCESS: {
    return {
      ...state, messages: action.messages
    };
  }
  case ADD_MESSAGE_TO_GROUP_SUCCESS: {
    return {
      ...state, messages: [...state.messages, action.messages]
    };
  }
  default:
    return state;
  }
}
