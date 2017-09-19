import { browserHistory } from 'react-router';
import axios from 'axios';
import toastr from 'toastr';
import * as types from '../constants/ActionTypes';

/**
 * create action: select a group
 * @function selectGroup
 * @param {string} groupId
 * @returns {object} action: type and groupId
 */
export function selectGroup(groupId) {
  return {
    type: types.SELECT_GROUP,
    groupId
  };
}
/**
 * create action: create a group: success
 * @function createGroupSuccess
 * @param {object} response
 * @returns {object} action: type and response
 */

export function createGroupSuccess(group) {
  return {
    type: types.CREATE_GROUP_SUCCESS,
    group
  };
}

/**
 * async helper function: create a group
 * @function createGroup
 * @param {string} name
 * @param {string} description
 * @returns {function} asynchronous action
 */

export function createGroup(group) {
  return dispatch => axios.post('/api/v1/group', group)
    .then((response) => {
      dispatch(createGroupSuccess(response.data));
    })
    .catch((error) => {
      toastr.error(error.response.data.msg);
    });
}

/**
 * receive group action: receive a group success
 * @function receiveGroupsSuccess
 * @param {object} response
 * @returns {object} action: type and response
 */

function receiveGroupsSuccess(groups) {
  return {
    type: types.RECEIVE_GROUPS_SUCCESS,
    groups
  };
}

/**
 * async helper function: fetches all groups
 * @returns {function} asynchronous action
 */

export function fetchGroups() {
  return dispatch => axios.get('/api/v1/group')
  .then(response => dispatch(receiveGroupsSuccess(response.data)))
  .catch((error) => {
    toastr.error(error.response.data.msg);
  });
}

