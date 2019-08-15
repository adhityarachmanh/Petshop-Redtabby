import React from "react";
import CAT_BG from "../../assets/img/pet-cat.jpeg";
import Countdown from "react-countdown-now";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { formatIDR } from "../../store/action/formatAction";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2";
import { uploadStruk, cancelOrder } from "../../store/action/checkoutAction";
import OrderItem from "./sections/OrderItem";
import { Link } from "react-router-dom";

class OrderPage extends React.Component {
  state = {
    progress: 0
  };
  handleEndOrder = () => {
    const { history, myOrder } = this.props;

    history.push("/");
  };

  rekFilter = bank => {
    if (bank === "bca") {
      return "214125215215";
    } else {
      return "123124214544";
    }
  };
  titleUpload = myOrder => {
    if (myOrder.struk && !myOrder.status) {
      return "Waiting Confirmation";
    } else if (myOrder.struk && myOrder.status) {
      return "Order Success";
    } else {
      return "Upload Struk";
    }
  };
  colorHeaderUpload = myOrder => {
    if (myOrder.struk && !myOrder.status) {
      return "card-header-warning";
    } else if (myOrder.struk && myOrder.status) {
      return "card-header-success";
    } else {
      return "";
    }
  };
  async handleUploadStruk(myOrder) {
    const { value: file } = await Swal.fire({
      title: "Select image",
      input: "file",
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your profile picture"
      }
    });

    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        Swal.fire({
          title: "Your uploaded picture",
          imageUrl: e.target.result,
          imageAlt: "The uploaded picture",

          confirmButtonText: "Yes Upload",
          showCancelButton: true,
          cancelButtonText: "No, cancel!",
          cancelButtonBackground: "danger",

          reverseButtons: true
        }).then(result => {
          if (result.value) {
            this.props.uploadStruk({
              myOrder: myOrder,
              file: file
            });
          }
        });
      };
      reader.readAsDataURL(file);
    }
  }
  handleShowStruk = struk => {
    Swal.fire({
      imageUrl: struk,
      imageHeight: 500,
      imageAlt: "A tall image"
    });
  };
  handleCancelOrdrder = myOrder => {
    Swal.fire({
      title: "Are you sure?",
      text: "Cancel This Order",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel This Order!"
    }).then(result => {
      if (result.value) {
        this.props.cancelOrder(myOrder);
        this.props.history.push("/");
      }
    });
  };
  render() {
    const { myOrder, profile, auth, progress, progressVal } = this.props;
    const waktu = myOrder ? myOrder.end_order - new Date().getTime() : null;
    if (!auth.uid) return <Redirect to="/" />;

    return (
      <>
        <div
          class="page-header header-filter"
          style={{
            backgroundImage: `url('${CAT_BG}')`
          }}
        >
          <div class="container">
            <div class="row">
              <OrderItem myOrder={myOrder} />
              <div class="col-lg-6 col-md-6 ml-auto mr-auto">
                <div class="card ">
                  <div
                    className={`card-header ${this.colorHeaderUpload(myOrder)}`}
                  >
                    <h3 className="card-title text-center">
                      {this.titleUpload(myOrder)}
                    </h3>
                    <h3 className="card-title text-center">
                      {" "}
                      {!myOrder.status ? (
                        <Countdown
                          onComplete={this.handleEndOrder}
                          daysInHours={true}
                          date={Date.now() + waktu}
                        />
                      ) : null}
                    </h3>
                  </div>
                  <div className="card-body">
                    <table className="table responsive text-center text-capitalize">
                      <tbody>
                        <tr>
                          <td>Name</td>
                          <td>:</td>
                          <td className="text-capitalize">
                            {profile.name && profile.name}
                          </td>
                        </tr>
                        <tr>
                          <td>Address</td>
                          <td>:</td>
                          <td className="text-capitalize">
                            {myOrder.address && myOrder.address}
                          </td>
                        </tr>
                        <tr>
                          <td>Phone</td>
                          <td>:</td>
                          <td className="text-capitalize">
                            {myOrder.phone && myOrder.phone}
                          </td>
                        </tr>
                        <tr>
                          <td>Total</td>
                          <td>:</td>
                          <td>
                            {myOrder.total && "IDR " + formatIDR(myOrder.total)}
                          </td>
                        </tr>
                        <tr>
                          <td>Payment</td>
                          <td />
                          <td>
                            Transfer{" "}
                            {myOrder.bank && myOrder.bank.toUpperCase()}
                          </td>
                        </tr>
                        <tr>
                          <td>No Rek</td>
                          <td />

                          <td>
                            {myOrder.bank && this.rekFilter(myOrder.bank)}
                          </td>
                        </tr>
                        {!myOrder.status ? (
                          <tr>
                            <td>Upload Struk</td>
                            <td />

                            <td>
                              {progress ? (
                                <div class="progress-container">
                                  <span class="progress-badge">
                                    Upload File...
                                  </span>
                                  <div class="progress">
                                    <div
                                      class="progress-bar"
                                      role="progressbar"
                                      aria-valuenow={progressVal}
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                      style={{ width: progressVal + "%" }}
                                    />
                                  </div>
                                </div>
                              ) : null}

                              {!myOrder.struk && !progress ? (
                                <button
                                  onClick={() =>
                                    this.handleUploadStruk(myOrder)
                                  }
                                  style={{ cursor: "pointer" }}
                                  class="btn btn-social btn-just-icon btn-round btn-info"
                                >
                                  <i class="fa fa-upload"> </i>
                                </button>
                              ) : (
                                <>
                                  {!progress ? (
                                    <>
                                      <button
                                        onClick={() =>
                                          this.handleShowStruk(myOrder.struk)
                                        }
                                        className="btn btn-success btn-sm "
                                      >
                                        Show Struk
                                      </button>
                                      <button
                                        onClick={() =>
                                          this.handleUploadStruk(myOrder)
                                        }
                                        className="btn btn-info btn-sm "
                                      >
                                        Re Upload
                                      </button>
                                    </>
                                  ) : null}
                                </>
                              )}
                            </td>
                          </tr>
                        ) : (
                          <tr>
                            <td>Struk</td>
                            <td />

                            <td>
                              {" "}
                              <button
                                onClick={() =>
                                  this.handleShowStruk(myOrder.struk)
                                }
                                className="btn btn-success btn-sm "
                              >
                                Show Struk
                              </button>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>

                    {!myOrder.struk ? (
                      <button
                        onClick={() => this.handleCancelOrdrder(myOrder)}
                        className="btn btn-danger btn-md btn-block"
                      >
                        Cancel
                      </button>
                    ) : null}
                    <Link
                      className="btn btn-info btn-md btn-block"
                      to="/manage-akun/history-order"
                    >
                      History Order
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const order = state.firestore.ordered.order;
  const auth = state.firebase.auth;
  const profile = state.firebase.profile;
  const myOrder = {
    ...(order &&
      order.find(d => {
        return d.uid === auth.uid && d.id === ownProps.match.params.id;
      }))
  };

  return {
    myOrder: myOrder,
    profile: profile,
    auth: auth,
    progress: state.shared.progress,
    progressVal: state.shared.progressVal
  };
};
const mapDispatchToProps = dispatch => {
  return {
    uploadStruk: data => dispatch(uploadStruk(data)),
    cancelOrder: data => dispatch(cancelOrder(data))
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "order" }])
)(OrderPage);
