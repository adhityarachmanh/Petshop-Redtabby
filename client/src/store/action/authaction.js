export const gasLogin = user => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        dispatch({ type: "LOGIN_BERHASIL" });
      })
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const gasLogout = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "LOGOUT_BERHASIL" });
      });
  };
};

export const gasDaftar = userBaru => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(userBaru.email, userBaru.password)
      .then(resp => {
        return firestore
          .collection("users")
          .doc(resp.user.uid)
          .set({
            name: userBaru.name,
            email: userBaru.email,
            photoURL:
              "https://www.sprayandwash.co.nz/wp-content/uploads/2018/12/person-icon-white-png-1.png"
          });
      })
      .then(() => {
        dispatch({ type: "DAFTAR_BERHASIL" });
      })
      .catch(err => {
        dispatch({ type: "DAFTAR_GAGAL", err: err.message });
      });
  };
};
