import axios from 'axios';
import toastr from 'toastr';
import * as types from '../constants/ActionTypes';

/**
 * @desc  create action:add message to group
 *
 * @function addMessageToGroupSuccess
 * @param {object} messages
 *
 * @returns {object} action: type and messages
 */
export function addMessageToGroupSuccess(messages) {
  return {
    type: types.ADD_MESSAGE_TO_GROUP_SUCCESS,
    messages
  };
}

/**
 * @desc get action: get group message
 *
 * @function getGroupMessagesSuccess
 *
 * @param {object} messages
 *
 * @returns {object} action: type and messages
 */
export function getGroupMessagesSuccess(messages) {
  return {
    type: types.GET_GROUP_MESSAGES_SUCCESS,
    messages
  };
}

/**
 * @desc async helper function: fetches Members in Group
 *
 * @function createMessage
 *
 * @param{integer} groupId
 * @param{object} messageData
 *
 * @returns {function} asynchronous action
 */
export function createMessage(groupId, messageData) {
  return dispatch => axios.post(`/api/v1/group/${groupId}/message`, messageData)
  .then((response) => {
    dispatch(addMessageToGroupSuccess(response.data));
  })
  .catch((error) => {
    toastr.error(error.response.data.message);
  });
}

/**
 * @desc async helper function: fetches all Group messages
 *
 * @function getAllGroupMessages
 *
 * @param{integer} groupId
 *
 * @returns {function} asynchronous action
 */
export function getAllGroupMessages(groupId) {
  return dispatch => axios.get(`/api/v1/group/${groupId}/message`)
  .then((response) => {
    dispatch(getGroupMessagesSuccess(response.data.messages));
  })
  .catch((error) => {
    toastr.error(error.response.data.message);
  });
}

