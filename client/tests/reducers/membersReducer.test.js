import expect from 'expect';
import membersReducer from '../../reducers/membersReducer';
import {
  ADD_MEMBERS_SUCCESS,
  ADD_MEMBERS_FAILURE,
  FETCH_USER_SUCCESS,
} from '../../constants/ActionTypes';


const initialState = {
  successMsg: '',
  errorMsg: '',
  users: [],
};
const users = [
  {
    username: 'jayk',
    email: 'joe@example.com',
    password: 'munah123'
  },
  {
    username: 'jaykop',
    email: 'joekop@example.com',
    password: 'munat123'
  }
];

describe('Members Reducers', () => {
  it('should return the initial state', () => {
    expect(membersReducer([], {})).toEqual([]);
  });
  it('should successfully fetch users', () => {
    expect(
      membersReducer(initialState,
        {
          type: FETCH_USER_SUCCESS,
          users,
        }
      )
    ).toEqual({
      successMsg: '',
      errorMsg: '',
      users
    });
  });
});
