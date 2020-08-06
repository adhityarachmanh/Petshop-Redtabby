import React from "react";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import Swal from "sweetalert2/dist/sweetalert2";
import { formatIDR } from "../../../store/action/formatAction";
class TrCheckout extends React.Component {
  showImage = image => {
    Swal.fire({
      imageUrl: image,
      imageHeight: 500,
      imageAlt: "A tall image"
    });
  };
  render() {
    const { infoShop, data, no } = this.props;
   
    return (
      <tr>
        <td>{no + 1}</td>
        <td>
          <a
            onClick={() => this.showImage(infoShop.image)}
            style={{ cursor: "pointer", color: "blue" }}
          >
            {infoShop.name}
          </a>
        </td>
        <td>{data.quantity}</td>
        <td>{data.total ? "IDR " + formatIDR(data.total) : null}</td>
      </tr>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const shop = state.firestore.ordered.shop;
  const auth = state.firebase.auth;
  const findShop = {
    ...(shop &&
      shop.find(d => {
        return d.id.indexOf(ownProps.data.shop_id) > -1;
      }))
  };
  // console.log("findShop", findShop);
  return {
    infoShop: findShop,
    auth: auth
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "shop" }])
)(TrCheckout);
