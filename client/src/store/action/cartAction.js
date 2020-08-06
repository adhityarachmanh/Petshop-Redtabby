export const addToCart = data => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const cart = firestore.collection("cart");
    let newData = data.data;
    let uid = data.uid;

    cart
      .where("uid", "==", uid)
      .where("shop_id", "==", newData.id)
      .get()
      .then(q => {
        if (q.empty) {
          cart.add({
            uid: uid,
            shop_id: newData.id,
            total: newData.price,
            quantity: 1
          });
        } else {
          cart.doc(q.docs[0].id).update({
            quantity: q.docs[0].data().quantity + 1,
            total: (q.docs[0].data().quantity + 1) * newData.price
          });
        }
      });
  };
};

export const deleteItemCart = data => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const cart = firestore.collection("cart");
    let cart_id = data.cart_id;

    cart
      .doc(cart_id)
      .delete()
      .then(() => {});
  };
};
export const changeQuantity = data => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const cart = firestore.collection("cart");
    let quantity = data.quantity;
    let cart_id = data.id;
    let price = data.price;
    let uid = data.uid;

    firestore
      .collection("cart")
      .doc(cart_id)
      .update({
        quantity: quantity,
        total: price * quantity
      });
  };
};
