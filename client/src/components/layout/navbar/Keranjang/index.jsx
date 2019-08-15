import React from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import CartItem from "./sections/CartItem";

class Keranjang extends React.Component {
  state = {
    background: "red",
    color: "white"
  };
  componentDidMount() {
    window.addEventListener("scroll", this.gantiWarna);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.gantiWarna);
  }
  gantiWarna = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      this.setState({
        background: "white",
        color: "black"
      });
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      this.setState({
        background: "red",
        color: "white"
      });
    }
  };
  render() {
    const { cart, shop } = this.props;
    return (
      <li className="dropdown  nav-item">
        <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
          <i className="material-icons">shopping_cart</i>
          Cart{" "}
          {cart && cart.length >= 1 ? (
            <span
              style={{
                background: this.state.background,
                color: this.state.color,
                borderRadius: "100%"
              }}
              className="my-auto px-2 py-1"
            >
              {cart && cart.length}
            </span>
          ) : null}
        </a>
        <ul className="dropdown-menu dropdown-cart">
          {cart && cart.length !== 0 ? (
            <>
              {cart &&
                cart.map((d, i) => {
                  return <CartItem key={i} data={d} />;
                })}
              <li class="divider" />
              <li className="">
                <Link className="btn btn-link btn-sm " to="/cart-page">
                  View Cart
                </Link>
              </li>
            </>
          ) : (
            <>
              <div class="container">
                <img
                  width="100%"
                  src="https://www.supplyvan.com/media/new_images/rsz_empty-cart.png"
                  alt=""
                />
              </div>
            </>
          )}
        </ul>
      </li>
    );
  }
}
const mapStateToProps = state => {
  const auth = state.firebase.auth;
  const cart = state.firestore.ordered.cart;

  const filterCart =
    cart &&
    cart.filter(d => {
      return d.uid.indexOf(auth.uid) > -1;
    });
  return {
    cart: filterCart
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "cart" }])
)(Keranjang);
