import { browserHistory } from 'react-router';
import axios from 'axios';
import moment from 'moment';
import * as types from '../constants/ActionTypes';

// NOTE:Chat actions

function addMessage(message) {
  return {
    type: types.ADD_MESSAGE,
    message
  };
}

export function receiveRawMessage(message) {
  return {
    type: types.RECEIVE_MESSAGE,
    message
  };
}

export function receiveRawGroup(group) {
  return {
    type: types.RECEIVE_GROUP,
    group
  };
}

function addGroup(group) {
  return {
    type: types.ADD_GROUP,
    group
  };
}


export function changeGroup(group) {
  return {
    type: types.CHANGE_GROUP,
    group
  };
}


function requestGroups() {
  return {
    type: types.LOAD_GROUPS
  };
}

function receiveGroups(json) {
  return {
    type: types.LOAD_GROUPS_SUCCESS,
    json
  }
}

export function fetchGroups() {
  return (dispatch) => {
    dispatch(requestGroups());
    return axios.get('/api/group/')
      .then(response => dispatch(receiveGroups(response.data)))
      .catch(error => {throw error});
  };
}


function requestMessages() {
  return {
    type: types.LOAD_MESSAGES
  };
}


function receiveMessages(json, groupId) {
  const date = moment().format('lll');
  return {
    type: types.LOAD_MESSAGES_SUCCESS,
    json,
    groupId,
    date
  };
}

export function fetchMessages(groupId) {
  return ((dispatch) => {
    dispatch(requestMessages());
    return axios.get(`/api/v1/group/${groupId}/message`)
      .then((response) => {
        dispatch(receiveMessages(response.data, groupId));
      })
      .catch((error) => { throw error; });
  });
}


export function createMessage(message) {
  return dispatch => {
    dispatch(addMessage(message))
    return fetch('/api/newmessage', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)})
      .catch(error => {throw error});
  };
}

export function createGroup(group) {
  return dispatch => {
    dispatch(addChannel(group))
    return fetch ('/api/channels/new_channel', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(group) })
      .catch((error) => {
        throw error;
      });
  };
}
