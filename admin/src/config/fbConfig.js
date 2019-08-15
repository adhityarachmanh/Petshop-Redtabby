import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

var fbConfig = {

};

firebase.initializeApp(fbConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
