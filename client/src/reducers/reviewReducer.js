import { NEW_REVIEW, FETCH_REVIEW } from '../actions/types';

export default function(state = null, action) {
  switch(action.type) {
    case NEW_REVIEW:
      return action.payload || false;
    case FETCH_REVIEW:
      return action.payload || false;
    default:
      return state;
  }
}