import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { BARANG_SAMPAI } from "../../../../store/action/checkoutAction";

class HistoryOrder extends React.Component {
  KURIR_IMAGE = KURIR => {
    let TEMPLATE_IMAGE = GAMBAR => <img width="150" height="50" src={GAMBAR} />;
    switch (KURIR) {
      case "JNE":
        return TEMPLATE_IMAGE(
          require("../../../../assets/img/kurir/" + KURIR + ".png")
        );
      case "TIKI":
        return TEMPLATE_IMAGE(
          require("../../../../assets/img/kurir/" + KURIR + ".png")
        );
      default:
        return;
    }
  };
  handleBarangSampai = ID => {
    Swal.fire({
      title: "Barang Sudah Sampai?",
      type: "question",
      text: "Jika Ya Transaksi Anda Telah Selesai",
      confirmButtonText: "Barang Sampai Tujuan",
      showCancelButton: true
    }).then(res => {
      if (res.value) {
        this.props.BARANG_SAMPAI(ID);
      }
    });
  };
  render() {
    const { myOrder } = this.props;
    return (
      <div class="tab-pane active">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <h3 className="title">History Order</h3>
              <table className="table responsive ">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Order</th>
                    <th>No Resi</th>
                    <th>Kurir</th>
                    <th>Status</th>
                    <th>Tools</th>
                  </tr>
                </thead>
                <tbody>
                  {myOrder &&
                    myOrder.map((d, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>
                            <Link to={`/order-page/${d.id}`}>Lihat Order</Link>
                          </td>
                          <td>
                            {d.no_resi ? (
                              d.no_resi
                            ) : (
                              <p
                                className="text-warning "
                                style={{ fontWeight: "bold" }}
                              >
                                Waiting ...
                              </p>
                            )}
                          </td>
                          <td>
                            {d.kurir ? (
                              this.KURIR_IMAGE(d.kurir)
                            ) : (
                              <p
                                className="text-warning "
                                style={{ fontWeight: "bold" }}
                              >
                                Waiting ...
                              </p>
                            )}
                          </td>
                          <td>
                            {!d.kurir && !d.no_resi ? (
                              <p
                                className="text-warning"
                                style={{ fontWeight: "bold" }}
                              >
                                Sedang Di Proses
                              </p>
                            ) : null}
                            {d.kurir && d.no_resi && d.status === "success" ? (
                              <p
                                className="text-info"
                                style={{ fontWeight: "bold" }}
                              >
                                Sedang Di Kirim
                              </p>
                            ) : null}
                            {d.kurir && d.no_resi && d.status === "finish" ? (
                              <p
                                className="text-success"
                                style={{ fontWeight: "bold" }}
                              >
                                Barang Sampai Tujuan
                              </p>
                            ) : null}
                          </td>
                          <td>
                            {d.kurir &&
                            d.no_resi &&
                            d.status === "finish" ? null : (
                              <button
                                onClick={() => this.handleBarangSampai(d.id)}
                                className="btn btn-success btn-sm"
                              >
                                <i className="material-icons">check</i>
                                Barang Sampai
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const order = state.firestore.ordered.order;
  const auth = state.firebase.auth;
  const myOrder =
    order &&
    order.filter(d => {
      return d.uid === auth.uid && d.status;
    });

  return {
    myOrder: myOrder
  };
};
const mapDispatchToProps = dispatch => {
  return {
    BARANG_SAMPAI: DATA_ID => dispatch(BARANG_SAMPAI(DATA_ID))
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "order", orderBy: ["created_at", "desc"] }])
)(HistoryOrder);
