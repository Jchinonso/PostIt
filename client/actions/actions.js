import { browserHistory } from 'react-router';
import axios from 'axios';
import * as types from '../constants/ActionTypes';


function addGroup(group) {
  return {
    type: types.ADD_GROUP,
    group
  };
}

export function createGroup(group) {
  return dispatch => axios.post('/api/v1/group', group)
    .then((response) => {
      dispatch(addGroup(response.data));
    })
    .catch((error) => {
      throw error;
    });
}

export function changeGroup(groupId) {
  return {
    type: types.CHANGE_GROUP,
    groupId
  };
}


function requestGroups() {
  return {
    type: types.LOAD_GROUPS
  };
}

function receiveGroups(groups) {
  return {
    type: types.LOAD_GROUPS_SUCCESS,
    groups
  };
}

export function fetchGroups() {
  return (dispatch) => {
    dispatch(requestGroups());
    return axios.get('/api/v1/group')
      .then(response => dispatch(receiveGroups(response.data)))
      .catch((error) => { throw error; });
  };
}

function addMessage(message) {
  return {
    type: types.ADD_MESSAGE,
    message
  };
}

export function createMessage(message, groupId) {
  return (dispatch) => {
    dispatch(addMessage(message));
    return axios.post(`/api/v1/${groupId}/message`, message)
      .catch((error) => { throw error; });
  };
}

function requestMessages() {
  return {
    type: types.LOAD_MESSAGES
  };
}

function receiveMessages(messages) {
  return {
    type: types.LOAD_MESSAGES_SUCCESS,
    messages,
  };
}

export function fetchMessages(groupId) {
  return ((dispatch) => {
    dispatch(requestMessages());
    return axios.get(`/api/v1/group/${groupId}/message`)
      .then((response) => {
        dispatch(receiveMessages(response.data));
      })
      .catch((error) => { throw error; });
  });
}

