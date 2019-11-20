export const LOGIN_ADMIN = data => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    localStorage.setItem("kesalahan", 3);
    const fs = getFirestore();
    const fb = getFirebase();
    dispatch({ type: "LOADING_START" });
    fs.collection("admins")
      .where("email", "==", data.email)
      .get()
      .then(q => {
        if (!q.empty) {
          fs.collection("admins")
            .doc(q.docs[0].id)
            .get()
            .then(doc => {
              if (doc.exists) {
                fb.auth()
                  .signInWithEmailAndPassword(data.email, data.password)
                  .then(() => {
                    fb.auth().onAuthStateChanged(user => {
                      fs.collection("admins")
                        .doc(user.uid)
                        .get()
                        .then(doc => {
                          localStorage.setItem("pin", doc.data().pin);
                        });
                    });
                    dispatch({ type: "LOADING_END" });
                    dispatch({
                      type: "LOGIN_BERHASIL"
                    });
                  })
                  .catch(err => {
                    dispatch({ type: "LOADING_END" });
                    dispatch({
                      type: "LOGIN_GAGAL",
                      err: "Password Anda Salah"
                    });
                  });
              }
            });
        } else {
          dispatch({ type: "LOADING_END" });
          dispatch({
            type: "BUKAN_ADMIN",
            err: "Email Anda Tidak Terdaftar Sebagai Admin"
          });
        }
      });
  };
};
export const LOGOUT_ADMIN = data => {
  return (dispatch, getState, { getFirebase }) => {
    localStorage.removeItem("pin");
    const fb = getFirebase();
    fb.auth()
      .signOut()
      .then(() => {
        dispatch({ type: "LOGOUT_BERHASIL" });
      });
  };
};
