import expect from 'expect';
import * as groupActions from '../../actions/groupActions';
import * as types from '../../constants/ActionTypes';

describe('Group action tests', () => {
  it('should create a select group action', () => {
    const groupId = 1;
    const expectedAction = {
      type: types.SELECT_GROUP,
      groupId
    };
    const action = groupActions.selectGroup(groupId);
    expect(action).toEqual(expectedAction);
  });
  it('should create a createGroupSuccess action', () => {
    const group = {
      name: 'lagos-all',
      description: 'talks about lagos'
    };
    const expectedAction = {
      type: types.CREATE_GROUP_SUCCESS,
      group
    };
    const action = groupActions.createGroupSuccess(group);
    expect(action).toEqual(expectedAction);
  });
  it('should create a createGroupFailure action', () => {
    const error = {
      msg: 'Invalid group credentials'
    };
    const expectedAction = {
      type: types.CREATE_GROUP_FAILURE,
      error
    };
    const action = groupActions.createGroupFailure(error);
    expect(action).toEqual(expectedAction);
  });
  it('should create receiveGroupsSuccess action', () => {
    const groups = ['Lagos-all', 'general', 'lagos-fellow'];
    const expectedAction = {
      type: types.RECEIVE_GROUPS_SUCCESS,
      groups
    };
    const action = groupActions.receiveGroupsSuccess(groups);
    expect(action).toEqual(expectedAction);
  });
  it('should create receiveGroupsFailure action', () => {
    const error = {
      msg: 'Unable to fetch group'
    };
    const expectedAction = {
      type: types.RECEIVE_GROUPS_FAILURE,
      error
    };
    const action = groupActions.receiveGroupsFailure(error);
    expect(action).toEqual(expectedAction);
  });
});
