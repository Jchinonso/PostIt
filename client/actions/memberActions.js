import axios from 'axios';
import * as types from '../constants/ActionTypes';
import { member, ERROR_OCCURRED } from './actionTypes';

function addMembersSuccess(message) {
  return {
    type: types.ADD_MEMBERS_SUCCESS,
    message
  };
}

export const addMemberToGroup = (groupId, username) => (
  dispatch => (
    axios.post(`/api/group/${groupId}/user`, username)
      .then((response) => {
        dispatch(addMembersSuccess(response.data.message));
      })
      .catch((err) => {
        throw err;
      })
  )
);

export const listGroupMembers = groupId => (
  dispatch => (
    axios.get(`/api/group/${groupId}/users`)
      .then(({ data }) => {
        dispatch({
          type: member.LIST_SUCCESS,
          list: data,
          groupId
        });
      })
      .catch(({ response: { data } }) => {
        dispatch({
          type: ERROR_OCCURRED,
          error: data
        });
      })
  )
);

export const searchUsers = (username) => (dispatch) => {
    axios.get(`/api/users?q=${username}`)
      .then(({ data }) => {
        dispatch({
          type: member.SEARCH_SUCCESS,
          list: data
        });
      })
      .catch((error) => {
        const data = error.response ? error.response.data : error;
        dispatch({
          type: ERROR_OCCURRED,
          error: data
        });
      });
  };
