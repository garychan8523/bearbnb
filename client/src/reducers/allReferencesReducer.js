import { FETCH_ALL_REFERENCES } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_ALL_REFERENCES:
      return action.payload || false;
    default:
      return state;
  }
}
