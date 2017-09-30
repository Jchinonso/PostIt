import axios from 'axios';
import toastr from 'toastr';
import * as types from '../constants/ActionTypes';

export function addMembersSuccess(member) {
  return {
    type: types.ADD_MEMBERS_SUCCESS,
    member
  };
}
function fetchUserSuccess(users) {
  return {
    type: types.FETCH_USER_SUCCESS,
    users
  };
}
function fetchGroupMembersSuccess(members) {
  return {
    type: types.FETCH_GROUP_MEMBERS_SUCCESS,
    members
  };
}
export function addMembersFailure(error) {
  return {
    type: types.ADD_MEMBERS_FAILURE,
    error
  };
}

export function addMemberToGroup(groupId, username) {
  return (dispatch) => {
    axios.post(`/api/v1/group/${groupId}/user`, username)
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

