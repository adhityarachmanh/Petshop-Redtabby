import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import "./media.css";
class MediaLogin extends React.Component {
  state = { login: false };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccess: () => false
    }
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const fst = firebase
          .firestore()
          .collection("users")
          .doc(user.uid);

        fst.get().then(doc => {
          if (doc.exists) {
          } else {
            fst.set({
              name: user.displayName,
              email: user.email,
              photoURL: user.photoURL
            });
          }
        });
      }
    });
  }
  render() {
    return (
      <div>
        <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }
}
export default MediaLogin;
