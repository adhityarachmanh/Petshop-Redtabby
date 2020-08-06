import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

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
                      <div className="row">
                        {this.props.kartusehat.length
                          ? dumpKartuSehat.map((d, i) => {
                              // console.log(i);
                              return <KartuSehatItem key={i} {...d} />;
                            })
                          : null}
                      </div>
                    ) : <div className="row align-items-center justify-center d-flex">
                      <p>asfas</p>
                      </div>}
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
  kartusehat = kartusehat && kartusehat.filter((d) => d.id.includes(auth.uid));

  return {
    kartusehat,
    auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: "kartusehat", orderBy: ["created_at", "desc"] },
  ])
)(KartuSehat);

function KartuSehatItem(props) {
  // console.log(props);
  return (
    <div className="col-md-4 col-lg-4">
      <div className="rotating-card-container">
        <div className="card card-rotate card-background card-pricing">
          <div
            className="front front-background"
            style={{
              backgroundImage: `url('/static/media/slider-2.6b270a89.jpg')`,
            }}
          >
            <div className="card-body">
              <div className="icon">
                <i className="material-icons text-white">pets</i>
              </div>
              <a href="#pablo">
                <h3 className="card-title">{props.name}</h3>
              </a>
            </div>
          </div>
          <div
            className="back back-background"
            style={{
              backgroundImage: `url('/static/media/slider-2.6b270a89.jpg')`,
            }}
          >
            <div className="card-body ">
              <div className="footer text-center">
                <a
                  href="#pablo"
                  className="btn btn-info btn-just-icon btn-fill btn-round btn-wd"
                >
                  <i className="material-icons">print</i>
                </a>
                <a
                  href="#pablo"
                  className="btn btn-secondary btn-just-icon btn-fill btn-round btn-wd"
                >
                  <i className="material-icons">mode_edit</i>
                </a>
                <a
                  href="#pablo"
                  className="btn btn-danger btn-just-icon btn-fill btn-round"
                >
                  <i className="material-icons">delete</i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
