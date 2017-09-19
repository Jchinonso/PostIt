import axios from 'axios';
import toastr from 'toastr';
import * as types from '../constants/ActionTypes';

function addMessageToGroupSuccess(messages) {
  return {
    type: types.ADD_MESSAGE_TO_GROUP_SUCCESS,
    messages
  };
}

function getGroupMessagesSuccess(messages) {
  return {
    type: types.GET_GROUP_MESSAGES_SUCCESS,
    messages
  };
}

export function createMessage(groupId, messageData) {
  return dispatch => axios.post(`/api/v1/group/${groupId}/message`, messageData)
  .then((response) => {
    dispatch(addMessageToGroupSuccess(response.data));
  })
  .catch((error) => {
    toastr.error(error.response.data.message);
  });
}

export function getAllGroupMessages(groupId) {
  return dispatch => axios.get(`/api/v1/group/${groupId}/message`)
  .then((response) => {
    dispatch(getGroupMessagesSuccess(response.data));
  })
  .catch((error) => {
    toastr.error(error.response.data.message);
  });
}

