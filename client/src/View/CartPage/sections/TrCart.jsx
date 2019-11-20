import React from "react";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  changeQuantity,
  deleteItemCart
} from "../../../store/action/cartAction";
import { formatIDR } from "../../../store/action/formatAction";
import Swal from "sweetalert2/dist/sweetalert2";

class TrCart extends React.Component {
  handleChange = e => {
    const { auth, infoShop, changeQuantity } = this.props;
    const data = {
      price: infoShop.price,
      uid: auth.uid,
      id: e.target.id,
      quantity: e.target.value
    };
    changeQuantity(data);
  };
  deleteItemCart = data => {
    Swal.fire({
      title: "Are you sure?",
      text: data.infoShop.name,
      type: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        this.props.deleteItemCart({
          cart_id: data.cart_id
        });
      }
    });
  };
  render() {
    const { infoShop, data } = this.props;
    return (
      <tr>
        <td>
          <img width="100" height="100px" src={infoShop.image} alt="" />
        </td>
        <td>{infoShop.name}</td>
        <td>
          {" "}
          <button
            onClick={() =>
              this.deleteItemCart({
                cart_id: data.id,
                infoShop: infoShop
              })
            }
            class="btn btn-social btn-just-icon btn-round btn-twitter"
          >
            <i class="fa fa-trash" />
          </button>
          <br />
        </td>
        <td>
          <div className="col-md-4">
            <input
              id={data.id}
              min="1"
              className="form-control number"
              type="number"
              onChange={this.handleChange}
              defaultValue={data.quantity}
            />
          </div>
        </td>
        <td>{infoShop.price?"IDR " + formatIDR(infoShop.price) : null}</td>
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
const mapDispatchToProps = dispatch => {
  return {
    changeQuantity: data => dispatch(changeQuantity(data)),
    deleteItemCart: data => dispatch(deleteItemCart(data))
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "shop" }])
)(TrCart);
