export const editProfileImage = data => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const fs = getFirestore();
    const fb = getFirebase();
    var storageRef = fb.storage().ref();

    let file = data.file;

    let metaData = {
      contentType: "image/jpeg"
    };
    var uploadTask = storageRef
      .child("profile/" + data.uid)
      .put(file, metaData);

    uploadTask.on(
      fb.storage.TaskEvent.STATE_CHANGED,
      function(s) {
        let progress = (s.bytesTransferred / s.totalBytes) * 100;

        dispatch({
          type: "PROGRESS_LOAD",
          progressVal: Math.round(progress)
        });
      },
      function(err) {},
      function() {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then(url => {
            fs.collection("users")
              .doc(data.uid)
              .update({
                photoURL: url
              });
          })
          .then(() => {
            dispatch({
              type: "UPLOAD_FINISH"
            });
          });
      }
    );
  };
};

export const editProfile = data => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const fs = getFirestore();
    let id = data.uid;
    const newData = {
      ...data.newData
    };
    fs.collection("users")
      .doc(id)
      .update(newData);
  };
};
