import { FETCH_USER, UPDATE_USER } from '../actions/types';

export default function(state = null, action) {
  switch(action.type) {
    case UPDATE_USER:
      return action.payload || false;
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}