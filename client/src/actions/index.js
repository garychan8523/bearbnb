import axios from "axios";
import {
  FETCH_USER,
  UPDATE_USER,
  FETCH_PROFILE,
  NEW_REVIEW,
  FETCH_REVIEW,
  FETCH_HOME,
  FETCH_REFERENCE,
  UPDATE_HOME,
  NEW_HOME,
  NEW_REFERENCE,
  FETCH_ALL_HOMES,
  FETCH_ALL_USERS,
  FETCH_ALL_REVIEWS,
  FETCH_ALL_REFERENCES
} from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const updateUser = (updatedUser, id) => async dispatch => {
  const res = await axios.put(`/api/current_user/${id}`, updatedUser);
  dispatch({ type: UPDATE_USER, payload: res.data });
};

export const fetchProfile = id => async dispatch => {
  const res = await axios.get(`/api/profile/${id}`);
  dispatch({ type: FETCH_PROFILE, payload: res.data });
};

export const newReview = review => async dispatch => {
  const res = await axios.post("/api/new_review", review);

  dispatch({ type: NEW_REVIEW, payload: res.data });
};

export const newReference = reference => async dispatch => {
  const res = await axios.post("/api/new_reference", reference);

  dispatch({ type: NEW_REFERENCE, payload: res.data });
};

export const fetchReview = id => async dispatch => {
  const res = await axios.get(`/reviews/${id}`);
  dispatch({ type: FETCH_REVIEW, payload: res.data });
};

export const fetchReference = id => async dispatch => {
  const res = await axios.get(`/reference/${id}`);
  dispatch({ type: FETCH_REFERENCE, payload: res.data });
};

export const fetchHome = id => async dispatch => {
  const res = await axios.get(`/api/homes/${id}`);
  dispatch({ type: FETCH_HOME, payload: res.data });
};

export const newHome = home => async dispatch => {
  const res = await axios.post("/api/new_home", home);

  dispatch({ type: NEW_HOME, payload: res.data });
};

export const updateHome = (updatedHome, id) => async dispatch => {
  const res = await axios.put(`/api/homes/${id}`, updatedHome);
  dispatch({ type: UPDATE_HOME, payload: res.data });
};

export const fetchAllHomes = () => async dispatch => {
  const res = await axios.get("/api/homes");
  dispatch({ type: FETCH_ALL_HOMES, payload: res.data });
};

export const fetchAllUsers = () => async dispatch => {
  const res = await axios.get("/api/users");
  dispatch({ type: FETCH_ALL_USERS, payload: res.data });
};

export const fetchAllReviews = () => async dispatch => {
  const res = await axios.get("/reviews");
  dispatch({ type: FETCH_ALL_REVIEWS, payload: res.data });
};

export const fetchAllReferences = () => async dispatch => {
  const res = await axios.get("/references");
  dispatch({ type: FETCH_ALL_REFERENCES, payload: res.data });
};
