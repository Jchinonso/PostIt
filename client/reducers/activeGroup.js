import { CHANGE_GROUP } from '../constants/ActionTypes';

const initialState = {
  name: 'General',
  id: 0
};

export default function activeGroup(state = initialState, action) {
  switch (action.type) {
  case CHANGE_GROUP:
    return {
      name: action.group.name,
      id: action.group.id
    };

  default:
    return state;
  }
}
