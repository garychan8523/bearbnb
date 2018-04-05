import { combineReducers } from "redux";
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import reviewReducer from './reviewReducer';
import homeReducer from './homeReducer';
import referenceReducer from './referenceReducer';
import allHomesReducer from './allHomesReducer';
import allUsersReducer from "./allUsersReducer";
import allReviewsReducer from "./allReviewsReducer";
import allReferencesReducer from "./allReferencesReducer";

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  review: reviewReducer,
  home: homeReducer,
  reference: referenceReducer,
  allHomes: allHomesReducer,
  allUsers: allUsersReducer,
  allReviews: allReviewsReducer,
  allReferences: allReferencesReducer
});