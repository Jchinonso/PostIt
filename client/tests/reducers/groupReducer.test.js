import expect from 'expect';
import groupReducer from '../../reducers/groupReducer';
import {
  CREATE_GROUP_FAILURE,
  CREATE_GROUP_SUCCESS,
  RECEIVE_GROUPS_SUCCESS,
  RECEIVE_GROUPS_FAILURE
} from '../../constants/actionTypes';


const groups = [
  {
    name: 'Lagos-all',
    description: 'this is lagos'
  },
  {
    name: 'Nairobi',
    description: 'this is nairobi'
  }
];

describe('Group Reducers', () => {
  it('should return the initial state', () => {
    expect(groupReducer([], {})).toEqual([]);
  });
  it('should handle RECEIVE_GROUPS_SUCCESS', () => {
    expect(
      groupReducer({ groups: [], errorMsg: '' }, {
        type: RECEIVE_GROUPS_SUCCESS,
        groups,
      })
    ).toEqual({ groups, errorMsg: '' });
  });
  it('should handle RECEIVE_GROUPS_FAILURE', () => {
    expect(
      groupReducer({ groups: [], errorMsg: '' }, {
        type: RECEIVE_GROUPS_FAILURE,
        error: 'Internal server error'
      })
    ).toEqual({ groups: [], errorMsg: 'Internal server error' });
  });
  it('should handle CREATE_GROUPS_SUCCESS', () => {
    const group = [groups[0]];
    expect(
      groupReducer({ group, errorMsg: '' }, {
        type: RECEIVE_GROUPS_FAILURE,
        group: [groups[1]]
      })
    ).toEqual({ group, errorMsg: '' });
  });
});
