import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import { sharedReducer } from "./sharedReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  shared: sharedReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});
