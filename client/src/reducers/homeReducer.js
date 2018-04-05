import { FETCH_HOME, NEW_HOME, UPDATE_HOME } from '../actions/types';

export default function(state = null, action) {
  switch(action.type) {
    case FETCH_HOME:
      return action.payload || false;
    case NEW_HOME:
      return action.payload || false;
    case UPDATE_HOME:
      return action.payload || false;
    default:
      return state;
  }
}