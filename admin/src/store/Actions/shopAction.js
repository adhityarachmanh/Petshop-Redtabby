export const ADD_NEW_ITEM_SHOP = DATA => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const fb = getFirebase();
    const fs = getFirestore();
    const storageRef = fb.storage().ref();

    const newData = {
      name: DATA.name,
      price: DATA.price,
      description: DATA.description,
      category: DATA.category,
      pet: "cat"
    };

    fs.collection("shop")
      .add(newData)
      .then(docRef => {
        if (DATA.image.type === "upload") {
          let file = DATA.image.upload;
          const metadata = {
            contentType: "image/jpeg"
          };
          const uploadTask = storageRef
            .child("shop/" + docRef.id)
            .put(file, metadata);

          uploadTask.on(
            fb.storage.TaskEvent.STATE_CHANGED,
            function(snapshot) {
              let progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              dispatch({
                type: "PROGRESS_START",
                progress: Math.round(progress)
              });
            },
            function(err) {
              dispatch({ type: "PROGRESS_END" });
            },
            function() {
              uploadTask.snapshot.ref.getDownloadURL().then(url => {
                fs.collection("shop")
                  .doc(docRef.id)
                  .update({
                    image: url
                  })

                  .then(() => {
                    dispatch({ type: "PROGRESS_END" });
                    DATA.history.push("/admin/manage-item/" + DATA.category);
                    dispatch({
                      type: "MARKER_START",
                      id: docRef.id
                    });
                  });
              });
            }
          );
        } else if (DATA.image.type === "url") {
          fs.collection("shop")
            .doc(docRef.id)
            .update({
              image: DATA.image.data
            })
            .then(() => {
              DATA.history.push("/admin/manage-item/" + DATA.category);
              dispatch({
                type: "MARKER_START",
                id: docRef.id
              });
            });
        }
      });
  };
};
export const REMOVE_ITEM_SHOP = SHOP_ID => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const fs = getFirestore();
    const fb = getFirebase();
    const storageRef = fb.storage().ref();

    storageRef
      .child("shop/" + SHOP_ID)
      .getDownloadURL()
      .then(URL => {
        if (URL) {
          storageRef.child("shop/" + SHOP_ID).delete();
        }
      })
      .catch(err => {});
    fs.collection("shop")
      .doc(SHOP_ID)
      .delete()
      .then(() => {
        dispatch({
          type: "ALERT_START",
          color: "success",
          text: " Data Telah Di Hapus"
        });
        setTimeout(() => {
          dispatch({
            type: "ALERT_END"
          });
        }, 5000);
      });
  };
};
export const EDIT_ITEM_SHOP = DATA => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const fs = getFirestore();
    const fb = getFirebase();
    const storageRef = fb.storage().ref();
    if (DATA.newData.image) {
      console.log(" ada gambar");
      switch (DATA.newData.image.type) {
        case "url":
          storageRef
            .child("shop/" + DATA.SHOP_ID)
            .getDownloadURL()
            .then(url => {
              storageRef.child("shop/" + DATA.SHOP_ID).delete();
            })
            .catch(err => {
              console.log("ga ada gambar");
            });

          fs.collection("shop")
            .doc(DATA.SHOP_ID)
            .update({ ...DATA.newData, image: DATA.newData.image.data })
            .then(() => {
              DATA.history.push("/admin/manage-item/" + DATA.category);
              dispatch({ type: "MARKER_START", id: DATA.SHOP_ID });
            });
          return;
        case "upload":
          let file = DATA.newData.image.upload;
          let metadata = {
            contentType: "image/jpeg"
          };

          const uploadTask = storageRef
            .child("shop/" + DATA.SHOP_ID)
            .put(file, metadata);

          uploadTask.on(
            fb.storage.TaskEvent.STATE_CHANGED,
            function(snapshot) {
              let progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              dispatch({
                type: "PROGRESS_START",
                progress: Math.round(progress)
              });
            },
            function(err) {
              dispatch({ type: "PROGRESS_END" });
            },
            function() {
              uploadTask.snapshot.ref.getDownloadURL().then(url => {
                fs.collection("shop")
                  .doc(DATA.SHOP_ID)
                  .update({
                    ...DATA.newData,
                    image: url
                  })
                  .then(() => {
                    dispatch({ type: "PROGRESS_END" });
                    DATA.history.push("/admin/manage-item/" + DATA.category);
                    dispatch({ type: "MARKER_START", id: DATA.SHOP_ID });
                  });
              });
            }
          );
          return;
      }
    } else {
      fs.collection("shop")
        .doc(DATA.SHOP_ID)
        .update({ ...DATA.newData, image: DATA.OLD_DATA.image })
        .then(() => {
          DATA.history.push("/admin/manage-item/" + DATA.category);
          dispatch({ type: "MARKER_START", id: DATA.SHOP_ID });
        });
    }
  };
};
