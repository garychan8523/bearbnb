import { NEW_REFERENCE, FETCH_REFERENCE } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case NEW_REFERENCE:
      return action.payload || false;
    case FETCH_REFERENCE:
      return action.payload || false;
    default:
      return state;
  }
}
