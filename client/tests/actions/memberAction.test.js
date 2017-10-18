import expect from 'expect';
import * as membersActions from '../../actions/memberActions';
import * as types from '../../constants/ActionTypes';

describe('Member action tests', () => {
  it('should create addMembersSuccess action', () => {
    const message = {
      msg: 'Message successfully created'
    };
    const expectedAction = {
      type: types.ADD_MEMBERS_SUCCESS,
      message
    };
    const action = membersActions.addMembersSuccess(message);
    expect(action).toEqual(expectedAction);
  });
  it('should create a fetchUserSuccess action', () => {
    const users = ['jchinonso', 'jdoe', 'enodi'];
    const expectedAction = {
      type: types.FETCH_USER_SUCCESS,
      users
    };
    const action = membersActions.fetchUserSuccess(users);
    expect(action).toEqual(expectedAction);
  });
  it('should create a fetchGroupMembersSuccess action', () => {
    const members = ['jchinonso', 'emeka123', 'faith'];
    const expectedAction = {
      type: types.FETCH_GROUP_MEMBERS_SUCCESS,
      members
    };
    const action = membersActions.fetchGroupMembersSuccess(members);
    expect(action).toEqual(expectedAction);
  });
  it('should create addMembersFailure action', () => {
    const error = {
      msg: 'User already added to group'
    };
    const expectedAction = {
      type: types.ADD_MEMBERS_FAILURE,
      error
    };
    const action = membersActions.addMembersFailure(error);
    expect(action).toEqual(expectedAction);
  });
});
