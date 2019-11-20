import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import { cartReducer } from "./cartReducer";
import { sharedReducer } from "./sharedReducer";

export const rootReducers = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  shared: sharedReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});
