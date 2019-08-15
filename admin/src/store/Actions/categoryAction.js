import { getFirestore } from "redux-firestore";

export const ADD_CATEGORY = NEW_CATEGORY => {
  return (dispatch, getState, { getFirestate }) => {
    const fs = getFirestore();

    //ubah capital
    const HURUF_KAPITAL = s => {
      if (typeof s !== "string") return "";

      const s_split = s.split(" ");
      const s_map = s_split.map(d => {
        return d.replace(d[0], d[0].toUpperCase());
      });

      return s_map.toString().replace(/,/g, " ");
    };
    let name = HURUF_KAPITAL(NEW_CATEGORY.name);
    fs.collection("category")
      .where("name", "==", name)
      .get()
      .then(q => {
        if (!q.empty) {
          dispatch({
            type: "ALERT_START",
            text: "Oops... Category Sudah Ada",
            color: "danger"
          });
          setTimeout(() => {
            dispatch({
              type: "ALERT_END"
            });
          }, 3000);
        } else {
          fs.collection("category")
            .add({
              name: name
            })
            .then(() => {
              dispatch({
                type: "ALERT_START",
                text: "Category " + NEW_CATEGORY.name + " Berhasil Di Tambah",
                color: "success"
              });
              setTimeout(() => {
                dispatch({
                  type: "ALERT_END"
                });
              }, 3000);
            });
        }
      });
  };
};
export const DELETE_CATEGORY = CATEGORY => {
  return (dispatch, getState, { getFirestore }) => {
    const fs = getFirestore();
    fs.collection("category")
      .doc(CATEGORY.id)
      .delete()
      .then(() => {
        dispatch({
          type: "ALERT_START",
          text: "Category " + CATEGORY.name + " Berhasil Di Hapus",
          color: "success"
        });
        setTimeout(() => {
          dispatch({
            type: "ALERT_END"
          });
        }, 3000);
      });
  };
};
