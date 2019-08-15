import React from "react";
import ReactDOM from "react-dom";
import App from "App";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./store/Reducers/rootReducer";
import thunk from "redux-thunk";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import { reduxFirestore, getFirestore } from "redux-firestore";
import fbConfig from "./config/fbConfig";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      thunk.withExtraArgument({
        getFirebase,
        getFirestore
      })
    ),
    reactReduxFirebase(fbConfig, {
      useFirestoreForProfile: true,
      userProfile: "admins",
      attachAuthIsReady: true
    }),
    reduxFirestore(fbConfig)
  )
);
store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
});
