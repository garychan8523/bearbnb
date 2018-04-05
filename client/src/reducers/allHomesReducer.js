import { FETCH_ALL_HOMES } from '../actions/types';

export default function(state = null, action) {
  switch(action.type) {
    case FETCH_ALL_HOMES:
      return action.payload || false;
    default:
      return state;
  }
}