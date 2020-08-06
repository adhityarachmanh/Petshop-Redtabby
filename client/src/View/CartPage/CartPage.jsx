import React from "react";
import CAT_BG from "../../assets/img/pet-cat.jpeg";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import TrCart from "./sections/TrCart";
import { formatTotal, formatIDR } from "../../store/action/formatAction";

class CartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0
    };
  }
  handleCheckout = () => {
    this.props.history.push("/checkout-page");
  };
  render() {
    const { auth, cart } = this.props;
    const total = cart && formatIDR(formatTotal(cart));

    if (!auth.uid) return <Redirect to="/" />;
    return (
      <>
        <div
          className="page-header header-filter"
          data-parallax="true"
          style={{
            height: "500px",
            backgroundImage: `url('${CAT_BG}')`
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1 className="title text-capitalize">
                  <i className="material-icons">shopping_cart</i>
                  Cart
                </h1>

                <br />
              </div>
            </div>
          </div>
        </div>

        <div className="section ">
          <div className="row ml-auto mr-auto">
            <div className="col-md-10">
              <div className="card">
                <div className="card-header card-header-success">
                  <h3 className="title-card text-capitalize text-center">
                    Cart Item
                  </h3>
                </div>
                <div className="card-body">
                  <table className="table responsive">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th />
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart &&
                        cart.map((d, i) => {
                          return <TrCart key={i} data={d} />;
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card">
                <div className="card-header card-header-info">
                  <h3 className="title-card text-capitalize text-center">
                    shopping info
                  </h3>
                </div>
                <div className="card-body">
                  <table className="table responsive">
                    <tbody>
                      <tr>
                        <td className="pull-left">Total</td>
                        <td className="pull-right">
                          {total ? "IDR " + total : null}
                        </td>
                      </tr>
                      <tr>
                        <button
                          onClick={this.handleCheckout}
                          className="btn btn-outline-success btn-md btn-block"
                        >
                          Check Out
                        </button>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
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
    auth: auth,
    cart: filterCart
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "cart" }])
)(CartPage);
