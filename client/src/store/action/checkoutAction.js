export const checkOut = (data, history) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const cart = firestore.collection("cart");

    cart
      .where("uid", "==", data.uid)
      .get()
      .then(q => {
        if (!q.empty) {
          let oneDay = 24 * 3600000;
          firestore
            .collection("order")

            .add({
              ...data,
              // end_order: new Date().getTime() + 60000
              end_order: new Date().getTime() + oneDay
            })
            .then(doc => {
              q.docs.forEach(d => {
                firestore.collection("order_item").add({
                  order_id: doc.id,
                  ...d.data()
                });
              });

              history.push(`/order-page/${doc.id}`);
            })
            .then(() => {
              q.docs.forEach(d => {
                firestore
                  .collection("cart")
                  .doc(d.id)
                  .delete();
              });
            });
        }
      });
  };
};

export const uploadStruk = data => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const storage = firebase.storage;
    const storageRef = firebase.storage().ref();
    const order = firestore.collection("order");

    const myOrder = {
      ...data.myOrder
    };
    const file = data.file;
    const metaData = {
      contentType: "image/jpeg"
    };

    let uploadTask = storageRef
      .child("struk/" + myOrder.id)
      .put(file, metaData);

    uploadTask.on(
      storage.TaskEvent.STATE_CHANGED,
      function(s) {
        var progress = (s.bytesTransferred / s.totalBytes) * 100;
        dispatch({ type: "PROGRESS_LOAD", progressVal: Math.round(progress) });
      },
      function(err) {
        dispatch({ type: "PROFRESS_ERROR", err: err.message });
      },
      function() {
        uploadTask.snapshot.ref.getDownloadURL().then(url => {
          order
            .doc(myOrder.id)
            .update({
              struk: url
            })
            .then(() => {
              dispatch({ type: "UPLOAD_FINISH" });
            });
        });
      }
    );
  };
};
export const cancelOrder = data => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("order_item")
      .where("order_id", "==", data.id)
      .get()
      .then(q => {
        q.forEach(doc => {
          firestore
            .collection("order_item")
            .doc(doc.id)
            .delete();
        });
      })
      .then(() => {
        firestore
          .collection("order")
          .doc(data.id)
          .delete();
      });
  };
};

export const BARANG_SAMPAI = DATA_ID => {
  return (dispatch, getState, { getFirestore }) => {
    const fs = getFirestore();

    fs.collection("order")
      .doc(DATA_ID)
      .update({
        status: "finish"
      });
  };
};
