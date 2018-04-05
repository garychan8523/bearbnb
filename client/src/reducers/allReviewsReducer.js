import { FETCH_ALL_REVIEWS } from '../actions/types';

export default function(state = null, action) {
  switch(action.type) {
    case FETCH_ALL_REVIEWS:
      return action.payload || false;
    default:
      return state;
  }
}