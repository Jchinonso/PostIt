import axios from 'axios';
import * as types from '../constants/ActionTypes';

function addMessageToGroupSuccess(messageData) {
  return {
    type: types.ADD_MESSAGE_TO_GROUP_SUCCESS,
    messageData
  };
}

function getGroupMessagesSuccess(messages) {
  return {
    type: types.GET_GROUP_MESSAGES_SUCCESS,
    messages
  };
}

export const createMessage = (groupId, messageData) => (
  dispatch => (
    axios.post(`/api/group/${groupId}/message`, messageData)
      .then((response) => {
        dispatch(addMessageToGroupSuccess(response.data));
      })
      .catch((error) => {
        throw error;
      })
  )
);

export function getAllGroupMessages(groupId) {
  return dispatch => axios.get(`/api/group/${groupId}/message`)
  .then((response) => {
    dispatch(getGroupMessagesSuccess(response.data));
  })
  .catch((error) => { throw error; });
}

