import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { deleteKartuSehat } from "../../../../store/action/kartuSehatAction";
import Swal from "sweetalert2/dist/sweetalert2";

const dumpKartuSehat = [
  {
    documentID: "1",
    name: "Kucing 1",
    image: "",
  },
  {
    documentID: "2",
    name: "Kucing 2",
    image: "",
  },
];

class KartuSehat extends Component {
  handleSubmit = () => {};
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="tab-pane active">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12">
                <h3 className="title">Kartu Sehat</h3>
                <button
                  data-toggle="modal"
                  data-target="#tambah-kartu-sehat-modal"
                  className="btn btn-success  btn-sm"
                >
                  <i className="material-icons">add</i>
                  Tambah Kartu Sehat
                </button>
                <div className="cards" id="morphingCards">
                  <div className="container">
                    {this.props.kartusehat ? (
                      <div className="row text-center">
                        {this.props.kartusehat.length ? (
                          this.props.kartusehat.map((d, i) => {
                            // console.log(i);
                            return (
                              <KartuSehatItem key={i} {...d} {...this.props} />
                            );
                          })
                        ) : (
                          <div className="row  justify-content-center d-flex">
                            <h5>Anda belum memiliki kartu sehat </h5>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="row align-items-center justify-content-center d-flex">
                        <h3>Loading...</h3>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  const auth = state.firebase.auth;
  let kartusehat = state.firestore.ordered.kartusehat;
  kartusehat = kartusehat && kartusehat.filter((d) => d.uid.includes(auth.uid));

  return {
    kartusehat,
    auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteKartuSehat: (documentID) => dispatch(deleteKartuSehat(documentID)),
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: "kartusehat", orderBy: ["created_at", "desc"] },
  ])
)(KartuSehat);

class KartuSehatItem extends React.Component {
  deleteKartuSehat = (documentID) => {
    Swal.fire({
      title: "Anda yakin menghapus Kartu Sehat ini?",
      text: `Kartu Sehat ${this.props.name} akan di hapus!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        this.props.deleteKartuSehat(documentID);
        Swal.fire(
          "Deleted!",
          "kartu sehat " + this.props.name + " berhasil dihapus",
          "success"
        );
      }
    });
  };
  render() {
    return (
      <div className="col-md-4 col-lg-6">
        <div className="rotating-card-container">
          <div className="card card-rotate card-background card-pricing">
            <div
              className="front front-background    "
              style={{ backgroundColor: "#e91e63", height: "200px" }}
            >
              <div className="card-description m-4">
                
                <div className="row">
                  <div className="col-lg-4 d-none d-xl-block d-lg-block">
                    <img
                      class="img-raised rounded-circle img-fluid "
                      style={{ width: "150px", height: "150px" }}
                      src={this.props.image}
                    />
                  </div>
                  <div className="col-lg-8 ">
                    <table style={{ width: "100%" }}>
                      <tr className="mb-4">
                        <td colSpan={3}></td>
                        <td>{this.props.name}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td colSpan={3}>Umur</td>
                        <td>:</td>
                        <td>{this.props.umur}</td>
                      </tr>
                      <tr>
                        <td colSpan={3}>key</td>
                        <td>:</td>
                        <td>data</td>
                      </tr>
                      <tr>
                        <td colSpan={3}>key</td>
                        <td>:</td>
                        <td>data</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="back back-background"
              style={{
                backgroundImage: `url('${this.props.image}')`,
              }}
            >
              <div className="card-body ">
                <div className="footer text-center">
                  <ReactToPrint content={() => this.componentRef}>
                    <PrintContextConsumer>
                      {({ handlePrint }) => (
                        <button
                          type="button"
                          onClick={handlePrint}
                          className="btn btn-info btn-fill btn-round btn-wd"
                        >
                          <i class="material-icons">print</i> Print
                          <div class="ripple-container"></div>
                        </button>
                      )}
                    </PrintContextConsumer>
                  </ReactToPrint>
                  {/* <KartuSehatToPrint ref={(el) => (this.componentRef = el)} /> */}

                  <div style={{ display: "none" }}>
                    <KartuSehatToPrint ref={(el) => (this.componentRef = el)} />
                  </div>
                  <button
                    type="button"
                    onClick={() => this.deleteKartuSehat(this.props.id)}
                    className="btn btn-danger  btn-fill btn-round btn-wd"
                  >
                    <i class="material-icons">delete</i> Hapus
                    <div class="ripple-container"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class KartuSehatToPrint extends React.Component {
  render() {
    return (
      <table>
        <thead>
          <th>column 1</th>
          <th>column 2</th>
          <th>column 3</th>
        </thead>
        <tbody>
          <tr>
            <td>data 1</td>
            <td>data 2</td>
            <td>data 3</td>
          </tr>
        </tbody>
      </table>
    );
  }
}
