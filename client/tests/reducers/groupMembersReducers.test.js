
import expect from 'expect';
import groupMembersReducer from '../../reducers/groupMembersReducers';
import {
 FETCH_GROUP_MEMBERS_SUCCESS
} from '../../constants/actionTypes';


const users = [
  {
    username: 'jchinonso',
    email: 'jchinonso@gmail.com',
    phoneNo: '00009992992',
  },
  {
    username: 'emeka',
    email: 'emeka@andela.com',
    phoneNo: '0567577785875',
  },
];

describe('Group Members Reducer', () => {
  it('should return the initial state', () => {
    expect(groupMembersReducer([], {})).toEqual([]);
  });
  it('should handle FETCH_GROUP_MEMBERS_SUCCESS', () => {
    expect(
      groupMembersReducer([], {
        type: FETCH_GROUP_MEMBERS_SUCCESS,
        members: users
      })
    ).toEqual({ members: users });
  });
});
