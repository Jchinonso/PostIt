import expect from 'expect';
import * as messageActions from '../../actions/messageActions';
import * as types from '../../constants/ActionTypes';

describe('Message Actions', () => {
  it('should create addMessageToGroupSuccess action', () => {
    const messages = {
      content: 'i love pizza',
      priority: 'critical',
      sender: 'jchinonso'
    };
    const expectedAction = {
      type: types.ADD_MESSAGE_TO_GROUP_SUCCESS,
      messages
    };
    const action = messageActions.addMessageToGroupSuccess(messages);
    expect(action).toEqual(expectedAction);
  });
  it('should create getGroupMessagesSuccess action', () => {
    const messages = ['i love this group', 'hi guys ', ' this is dope'];
    const expectedAction = {
      type: types.GET_GROUP_MESSAGES_SUCCESS,
      messages
    };
    const action = messageActions.getGroupMessagesSuccess(messages);
    expect(action).toEqual(expectedAction);
  });
});
