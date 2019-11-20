import Swal from "sweetalert2";

export const stylesCard = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};
export const PROTECT_DATA = data => {
  const { image, name, price, description } = data;
  const SWAL_ALERT = data => Swal.fire({ ...data, type: "warning" });
  if (image === undefined || image === null || image === "") {
    SWAL_ALERT({
      title: "Please Select Image"
    });
    return false;
  } else if (name === undefined || name === null || name === "") {
    SWAL_ALERT({
      title: "Please Fill Name"
    });
    return false;
  } else if (price === undefined || price === null || price === "") {
    SWAL_ALERT({
      title: "Please Fill Price"
    });
    return false;
  } else if (
    description === undefined ||
    description === null ||
    description === ""
  ) {
    SWAL_ALERT({
      title: "Please Fill Description"
    });
    return false;
  }
  return true;
};
