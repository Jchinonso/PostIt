import expect from 'expect';
import groupMessageReducer from '../../reducers/groupMessagesReducer';
import {
GET_GROUP_MESSAGES_SUCCESS,
ADD_MESSAGE_TO_GROUP_SUCCESS
} from '../../constants/actionTypes';


const messages = [
  {
    content: 'i love pizza',
    priority: 'critical',
    sender: 'jchinonso'
  },
  {
    content: 'i love pizza',
    priority: 'normal',
    sender: 'jchinonso'
  }
];

describe('Group Message Reducers', () => {
  it('should return the initial state', () => {
    expect(groupMessageReducer([], {})).toEqual([]);
  });
  it('should handle GET_GROUP_MESSAGES_SUCCESS', () => {
    expect(
      groupMessageReducer([], {
        type: GET_GROUP_MESSAGES_SUCCESS,
        messages,
      })
    ).toEqual({ messages });
  });
  it('should handle ADD_MESSAGE_TO_GROUP_SUCCESS', () => {
    const message = { messages: messages[0] };
    expect(
      groupMessageReducer([], {
        type: ADD_MESSAGE_TO_GROUP_SUCCESS,
        messages: message
      })
    ).toEqual({ message });
  });
});
