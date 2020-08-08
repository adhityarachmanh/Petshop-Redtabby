export const deleteKartuSehat = (documentID) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const fs = getFirestore();
    const fb = getFirebase();
    var storageRef = fb.storage().ref();
    storageRef.child("kartusehat/" + documentID).delete();
    fs.collection("kartusehat").doc(documentID).delete();
  };
};

export const tambahKartuSehat = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const fs = getFirestore();
    const fb = getFirebase();
    var storageRef = fb.storage().ref();

    let file = data.image;
    delete data.image;
    let metaData = {
      contentType: "image/jpeg",
    };
    fs.collection("kartusehat")
      .add({
        ...data,
        created_at: new Date().toISOString(),
      })
      .then((docRef) => {
        var uploadTask = storageRef
          .child("kartusehat/" + docRef.id)
          .put(file, metaData);
        uploadTask.on(
          fb.storage.TaskEvent.STATE_CHANGED,
          function (s) {
            let progress = (s.bytesTransferred / s.totalBytes) * 100;

            dispatch({
              type: "PROGRESS_LOAD",
              progressVal: Math.round(progress),
            });
          },
          function (err) {},
          function () {
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then((url) => {
                fs.collection("kartusehat").doc(docRef.id).update({
                  image: url,
                });
              })
              .then(() => {
                dispatch({
                  type: "UPLOAD_FINISH",
                });
              });
          }
        );
      });
  };
};
