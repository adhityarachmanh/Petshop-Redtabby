import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";



class CartItem extends React.Component {
  // handleDeleteItem = d => {

  //   this.props.deleteItemCart({
  //     cart_id: d.id
  //   });
  // };
  render() {
    const { infoShop, data } = this.props;
    return (
      <li>
    
          <span className="item">
            <span className="item-left">
              <img width="50" height="50" src={infoShop.image} alt="" />
              <span className="item-info col-8">
                <span className=" text-truncate">{infoShop.name}</span>

                <span> {infoShop.price ? "IDR " + infoShop.price : null}</span>
              </span>
            </span>
            <span className="item-right ">
              <span>{data.quantity ? data.quantity + " Item" : null}</span>
            </span>
          </span>
    
      </li>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const shop = state.firestore.ordered.shop;
  const auth = state.firebase.auth;
  const findShop = {
    ...(shop &&
      shop.find(d => {
        return d.id === ownProps.data.shop_id;
      }))
  };

  return {
    infoShop: findShop,
    auth: auth
  };
};

export default compose(
  connect(
    mapStateToProps
    // mapDispatchToProps
  ),
  firestoreConnect([{ collection: "shop" }])
)(CartItem);
