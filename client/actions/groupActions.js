import { browserHistory } from 'react-router';
import axios from 'axios';
import toastr from 'toastr';
import * as types from '../constants/ActionTypes';

/**
 * @desc create action: select a group
 *
 * @function selectGroup
 *
 * @param {string} groupId
 *
 * @returns {object} action: type and groupId
 */
export function selectGroup(groupId) {
  return {
    type: types.SELECT_GROUP,
    groupId
  };
}
/**
 * @desc create action: create a group: success
 *
 * @function createGroupSuccess
 *
 * @param {object} group
 *
 * @returns {object} action: type and response
 */

export function createGroupSuccess(group) {
  return {
    type: types.CREATE_GROUP_SUCCESS,
    group
  };
}
/**
 * @desc create action: create group failure
 *
 * @function createGroupFailure
 *
 * @param {string} error
 *
 * @returns {object} action: type and error
 */
export function createGroupFailure(error) {
  return {
    type: types.CREATE_GROUP_FAILURE,
    error
  };
}

/**
 * @desc async helper function: create a group
 *
 * @function createGroup
 *
 * @param {string} name
 * @param {string} description
 *
 * @returns {function} asynchronous action
 */

export function createGroup(group) {
  return dispatch => axios.post('/api/v1/group', group)
    .then((response) => {
      dispatch(createGroupSuccess(response.data));
      toastr.success('Group Successfully Created');
    })
    .catch((error) => {
      dispatch(createGroupFailure(error.response.data.message));
      toastr.error(error.response.data.message);
    });
}

/**
 * @desc receive group action: receive a group success
 *
 * @function receiveGroupsSuccess
 *
 * @param {object} groups
 *
 * @returns {object} action: type and groups
 */

export function receiveGroupsSuccess(groups) {
  return {
    type: types.RECEIVE_GROUPS_SUCCESS,
    groups
  };
}
/**
 * @desc receive group action: receive a group failure
 *
 * @function receiveGroupsFailure
 *
 * @param {object} grpups
 *
 * @returns {object} action: type and error
 */

export function receiveGroupsFailure(error) {
  return {
    type: types.RECEIVE_GROUPS_FAILURE,
    error
  };
}

/**
 * @desc async helper function: fetches all groups
 * @returns {function} asynchronous action
 */

export function fetchGroups() {
  return dispatch => axios.get('/api/v1/group')
  .then((response) => {
    dispatch(receiveGroupsSuccess(response.data.groups));
  })
  .catch((error) => {
    toastr.error(error.response.data.message);
  });
}

