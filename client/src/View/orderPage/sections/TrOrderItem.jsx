import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Swal from "sweetalert2/dist/sweetalert2";
import { formatIDR } from "../../../store/action/formatAction";

class TrOrderItem extends React.Component {
  handleImage = infoShop => {
    Swal.fire({
      text: infoShop.name,
      imageUrl: infoShop.image,
      imageWidth: 400,
      imageHeight: 200,
      animation: false
    });
  };
  render() {
    const { infoShop, data } = this.props;
    if (infoShop) {
      return (
        <tr>
          <td>
            <a
              onClick={() => this.handleImage(infoShop)}
              style={{ cursor: "pointer", color: "blue" }}
            >
              {infoShop.name.substr(0, 40)}
            </a>
          </td>
          <td>{data.quantity}</td>
          <td>{infoShop.price ? "IDR " + formatIDR(infoShop.price) : null}</td>
          <td>{data.total ? "IDR " + formatIDR(data.total) : null}</td>
        </tr>
      );
    } else {
      return <div className="">Loading...</div>;
    }
  }
}
const mapStateToProps = (state, ownProps) => {
  const shop_id = ownProps.data.shop_id;
  const shop = state.firestore.data.shop;
  const infoShop = shop ? shop[shop_id] : null;

  return {
    infoShop: infoShop
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "shop" }])
)(TrOrderItem);
