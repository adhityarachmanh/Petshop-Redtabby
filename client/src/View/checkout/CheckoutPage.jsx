import React from "react";
import CAT_BG from "../../assets/img/pet-cat.jpeg";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import TrCheckout from "./sections/TrCheckout";
import BCA from "../../assets/img/BCA.png";
import BRI from "../../assets/img/BRI.png";
import { Redirect } from "react-router-dom";
import { formatTotal, formatIDR } from "../../store/action/formatAction";
import { checkOut } from "../../store/action/checkoutAction";
import Swal from "sweetalert2/dist/sweetalert2";

class CheckoutPage extends React.Component {
  state = {
    bank: "bca",
    phone: "",
    address: ""
  };
  handleNumber = e => {
    var ch = String.fromCharCode(e.which);
    if (!/[0-9]/.test(ch)) {
      e.preventDefault();
    }
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { auth, cart, history, profile } = this.props;
    const { phone, address, bank } = this.state;
    const newData = {
      phone: phone !== "" ? phone : profile.phone,
      address: address !== "" ? address : profile.address,
      name: profile.name,
      bank: bank,
      uid: auth.uid,
      total: formatTotal(cart),
      created_at: new Date().toISOString()
    };
    Swal.fire({
      title: "Are you sure?",
      text: "",
      type: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Checkout!"
    }).then(result => {
      if (result.value) {
        this.props.checkOut(newData, history);
      }
    });
  };
  render() {
    const { cart, auth, profile } = this.props;
    if (!auth.uid) return <Redirect to="/" />;
    return (
      <>
        <div
          class="page-header header-filter"
          data-parallax="true"
          style={{
            height: "500px",
            backgroundImage: `url('${CAT_BG}')`
          }}
        >
          <div class="container">
            <div class="row">
              <div class="col-md-6">
                <h1 class="title text-capitalize">Checkout</h1>
                <h2 class="title text-capitalize">Your Product.</h2>
                <br />
              </div>
            </div>
          </div>
        </div>
        <div className="section ">
          <div className="row ml-auto mr-auto">
            <div className="col-md-4">
              <div className="card">
                <div className="card-header card-header-success">
                  <h3 className="title-card text-capitalize text-center">
                    Item
                  </h3>
                </div>
                <div className="card-body">
                  <table className="table responsive">
                    <tbody>
                      {cart &&
                        cart.map((d, i) => {
                          return <TrCheckout no={i} key={i} data={d} />;
                        })}
                      <tr>
                        <td colspan="3">Total:</td>
                        <td>{cart && "IDR " + formatIDR(formatTotal(cart))}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card">
                <div className="card-header card-header-success">
                  <h3 className="title-card text-capitalize text-center">
                    Form Checkout
                  </h3>
                </div>
                <div className="card-body">
                  <form onSubmit={this.handleSubmit}>
                    <div className="row justify-content-center">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Name</label>
                          <input
                            disabled={profile.name}
                            defaultValue={profile.name}
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Email</label>
                          <input
                            disabled={profile.email}
                            defaultValue={profile.email}
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Address</label>
                          <input
                            id="address"
                            onChange={this.handleChange}
                            defaultValue={profile.address}
                            type="text"
                            required
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Phone</label>
                          <input
                            id="phone"
                            onChange={this.handleChange}
                            onKeyPress={this.handleNumber}
                            defaultValue={profile.phone}
                            type="text"
                            required
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <h3 className="title">Select Payment</h3>
                    </div>
                    <div className="row justify-content-center">
                      <div
                        className="col-md-4"
                        onClick={() =>
                          this.setState({
                            bank: "bca"
                          })
                        }
                        style={{
                          cursor: "pointer",
                          background:
                            this.state.bank === "bca" ? "#429846" : null,
                          padding: "10px"
                        }}
                      >
                        <img src={BCA} height="150px" width="100%" />
                      </div>
                      <div
                        className="col-md-4"
                        onClick={() =>
                          this.setState({
                            bank: "bri"
                          })
                        }
                        style={{
                          cursor: "pointer",
                          background:
                            this.state.bank === "bri" ? "#429846" : null,
                          padding: "10px"
                        }}
                      >
                        <img src={BRI} height="150px" width="100%" />
                      </div>
                    </div>
                    <div className="row justify-content-center mt-5">
                      <div className="col-md-4">
                        <button className="btn btn-success btn-md btn-block">
                          Checkout
                        </button>
                      </div>
                    </div>
                  </form>
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
  const profile = state.firebase.profile;
  const cart = state.firestore.ordered.cart;

  const filterCart =
    cart &&
    cart.filter(d => {
      return d.uid.indexOf(auth.uid) > -1;
    });
  return {
    auth: auth,
    cart: filterCart,
    profile: profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    checkOut: (data, history) => dispatch(checkOut(data, history))
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "cart" }])
)(CheckoutPage);
