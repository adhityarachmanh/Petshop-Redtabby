export const tambahGrooming = data => {
  return (dispatch, getState, { getFirestore }) => {
    const fs = getFirestore();

    fs.collection("grooming")

      .add({
        uid: data.uid,
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        tanggal: data.tanggal.toISOString(),
        created_at: new Date().toISOString()
      })
      .then(doc => {
        data.history.push("/manage-akun/my-grooming");
      });
  };
};

export const cancelGrooming = data => {
  return (dispatch, getState, { getFirestore }) => {
    const fs = getFirestore();

    fs.collection("grooming")
      .doc(data.id)
      .delete();
  };
};
