export const TERIMA_ORDER = ORDER_ID => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const fs = getFirestore();
    const fb = getFirebase();

    fs.collection("order")
      .doc(ORDER_ID)
      .update({
        status: "success"
      })
      .then(() => {
        dispatch({
          type: "ALERT_START",
          text: "Order Berhasil Di Terima",
          color: "success"
        });
        setTimeout(() => {
          dispatch({ type: "ALERT_END" });
        }, 5000);
      });
  };
};

export const PILIH_KURIR = ORDER_DATA => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const fs = getFirestore();
    const fb = getFirebase();

    fs.collection("order")
      .doc(ORDER_DATA.id)
      .update({
        kurir: ORDER_DATA.kurir
      })
      .then(() => {
        dispatch({
          type: "ALERT_START",
          text: "Kurir Berhasil Di Tambah",
          color: "success"
        });
        setTimeout(() => {
          dispatch({ type: "ALERT_END" });
        }, 5000);
      });
  };
};
export const INPUT_RESI = ORDER_DATA => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const fs = getFirestore();
    const fb = getFirebase();

    fs.collection("order")
      .doc(ORDER_DATA.id)
      .update({
        no_resi: ORDER_DATA.resi
      })
      .then(() => {
        dispatch({
          type: "ALERT_START",
          text: "Resi Berhasil Di Input",
          color: "success"
        });
        setTimeout(() => {
          dispatch({ type: "ALERT_END" });
        }, 5000);
      });
  };
};
