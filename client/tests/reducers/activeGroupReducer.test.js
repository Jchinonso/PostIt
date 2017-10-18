import expect from 'expect';
import activeGroupReducer from '../../reducers/activeGroupReducer';
import * as groupActions from '../../actions/groupActions';

describe('ActiveGroup Reducer', () => {
  it('should select group when passed SELECT_GROUP action', () => {
    const initialState = 2;
    const newgGroupId = 3;
    const action = groupActions.selectGroup(newgGroupId);
    const newState = activeGroupReducer(initialState, action);

    expect(newState).toEqual(3);
  });
});
