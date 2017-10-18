import axios from 'axios';
import toastr from 'toastr';
import * as types from '../constants/ActionTypes';


/**
 * create action: add members to group
 * @function addMembersSuccess
 * @param {object} message
 * @returns {object} action: type and message
 */
export function addMembersSuccess(message) {
  return {
    type: types.ADD_MEMBERS_SUCCESS,
    message
  };
}

/**
 * get action: fetch all users
 * @function fetchUserSuccess
 * @param {object} users
 * @returns {object} action: type and users
 */
export function fetchUserSuccess(users) {
  return {
    type: types.FETCH_USER_SUCCESS,
    users
  };
}

/**
 * get action: fetch all group members
 * @function fetchGroupMembersSuccess
 * @param {object} members
 * @returns {object} action: type and members
 */
export function fetchGroupMembersSuccess(members) {
  return {
    type: types.FETCH_GROUP_MEMBERS_SUCCESS,
    members
  };
}
/**
 * create action: failure action for add members
 * @function addMembersFailure
 * @param {object} error
 * @returns {object} action: type and error
 */
export function addMembersFailure(error) {
  return {
    type: types.ADD_MEMBERS_FAILURE,
    error
  };
}

/**
 * async helper function: add Members to Group
 * @function addMemberToGroup
 * @param{integer} groupId,
 * @param{array} members,
 * @returns {function} asynchronous action
 */
export function addMemberToGroup(groupId, members) {
  return (dispatch) => {
    axios.post(`/api/v1/group/${groupId}/user`, members)
      .then((response) => {
        toastr.success(response.data.msg);
        dispatch(addMembersSuccess(response.data.msg));
      })
      .catch((err) => {
        toastr.error(err.response.data.msg);
        dispatch(addMembersFailure(err.response.data.msg));
      });
  };
}

/**
 * async helper function: add Members to Group
 * @function fetchUsers
 * @returns {function} asynchronous action
 */
export function fetchUsers() {
  return (dispatch) => {
    axios.get('/api/v1/user')
      .then((response) => {
        dispatch(fetchUserSuccess(response.data.users));
      })
      .catch((err) => {
        toastr.error(err.response.data.msg);
      });
  };
}

/**
 * async helper function: fetches Members in Group
 * @function fetchGroupMembers
 * @param{integer} groupId
 * @returns {function} asynchronous action
 */
export function fetchGroupMembers(groupId) {
  return (dispatch) => {
    axios.get(`/api/v1/group/${groupId}/user`)
      .then((response) => {
        dispatch(fetchGroupMembersSuccess(response.data.groupMembers));
      })
      .catch((err) => {
        toastr.error(err.response.data.msg);
      });
  };
}

