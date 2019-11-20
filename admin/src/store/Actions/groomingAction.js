export const TERIMA_GROOMING = GROOMING_ID => {
  return (dispatch, getState, { getFirestore }) => {
    const fs = getFirestore();

    fs.collection("grooming")
      .doc(GROOMING_ID)
      .update({
        status: "success",
        updated_at: new Date().toISOString()
      })
      .then(() => {
        dispatch({
          type: "ALERT_START",
          text: "Grooming Success",
          color: "success"
        });
        setTimeout(() => {
          dispatch({ type: "ALERT_END" });
        }, 5000);
      });
  };
};
