import {
GET_GROUP_MESSAGES_SUCCESS,
ADD_MESSAGE_TO_GROUP_SUCCESS
} from '../constants/ActionTypes';

const activeGroupMessages = (state = [], action) => {
  switch (action.type) {
  case GET_GROUP_MESSAGES_SUCCESS: {
    return action.messages;
  }
  case ADD_MESSAGE_TO_GROUP_SUCCESS: {
    return [
      ...state,
      action.messages
    ];
  }
  default:
    return state;
}
};

export default activeGroupMessages;
