import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

var fbConfig = {
  apiKey: "AIzaSyCXCDHLJ5P0Nyx6OkAGufBBFhqQxs46KkM",
  authDomain: "xena-58c4b.firebaseapp.com",
  databaseURL: "https://xena-58c4b.firebaseio.com",
  projectId: "xena-58c4b",
  storageBucket: "xena-58c4b.appspot.com",
  messagingSenderId: "405333580507",
  appId: "1:405333580507:web:ad7aa967f22ca679"
};

firebase.initializeApp(fbConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
