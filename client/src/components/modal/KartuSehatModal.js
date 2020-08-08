import React, { Component } from "react";
import { connect } from "react-redux";
import { tambahKartuSehat } from "../../store/action/kartuSehatAction";
import swal from "sweetalert2/dist/sweetalert2";

class KartuSehatModal extends Component {
  constructor() {
    super();
    this.state = {
      vaksin: [],
      errors: [],
      isLoading: false,
    };
  }
  componentDidMount() {
    document
      .getElementById("image")
      .addEventListener("change", this.handleChange);
    document.getElementById("remove-image").addEventListener("click", () => {
      delete this.state.image;
    });
  }
  handleSetYear = (e) => {
    let yearFormat = new RegExp("^[0-9]+$");
    let getYear = new Date().getFullYear();
    let inputName = e.target.id;
    if (!yearFormat.test(e.target.value)) {
      e.target.value = null;
      return;
    } else if (e.target.value > getYear) {
      e.target.value = null;
      swal.fire("Error", "Sekarang adalah tahun " + getYear, "error");
      return;
    }
    const vaksin = this.state.vaksin;
    let vaksinID = parseInt(inputName.split("-")[1]);

    vaksin.filter((e) => e.vaksin === vaksinID)[0].year = parseInt(
      e.target.value
    );
    this.setState({ vaksin });
  };
  handleChange = (e) => {
    let inputName = e.target.id;
    switch (inputName) {
      case "vaksin":
        const vaksin = this.state.vaksin;
        let isChecked = e.target.checked;
        let inputYear = document.getElementById(
          inputName + "-" + e.target.value
        );
        inputYear.hidden = !inputYear.hidden;
        let value = {
          vaksin: parseInt(e.target.value),
        };
        if (isChecked) vaksin.push(value);
        else {
          let idx = vaksin.indexOf(value);
          vaksin.splice(idx, 1);
        }
        this.setState({ vaksin });
        break;
      case "image":
        this.setState({ [inputName]: e.target.files[0] });
        break;
      default:
        this.setState({ [inputName]: e.target.value });
        break;
    }
  };
  handleSubmit = (e) => {
    const errors = [];
    const { name, umur, image, vaksin } = this.state;
    e.preventDefault();

    if (!name) errors.push("name");
    if (!umur) errors.push("umur");
    if (!image) errors.push("image");

    this.setState({ errors, isLoading: true });
    if (!errors.length) {
      this.props.tambahKartuSehat({
        uid: this.props.auth.uid,
        name,
        umur,
        image,
        vaksin,
      });
      this.setState({
        errors: [],
        isLoading: false,
        vaksin: [],
      });
      document.getElementById("ks-btn-close").click();
    } else {
      swal.fire("Error!", errors.toString() + " harus di isi", "error");
    }
  };
  render() {
    return (
      <React.Fragment>
        <div
          className="modal fade"
          id="tambah-kartu-sehat-modal"
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-signup" role="document">
            <div className="modal-content">
              <div className="card card-signup card-plain">
                <div className="modal-header">
                  <h3 className="modal-title card-title">Tambah Kartu Sehat</h3>
                  <button
                    id="ks-btn-close"
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <i className="material-icons">clear</i>
                  </button>
                </div>

                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-5 ml-auto">
                      <div className="info info-horizontal">
                        <div className="icon icon-rose">
                          <i className="material-icons">image</i>
                        </div>
                        <div className="description">
                          <h4 className="info-title">Foto Hewan Peliharaan</h4>
                          {this.state.errors.includes("image") ? (
                            <p className="text-danger">Image required</p>
                          ) : null}
                          <div
                            className="fileinput fileinput-new text-center"
                            data-provides="fileinput"
                          >
                            <div className="fileinput-new thumbnail img-raised">
                              <img
                                src={require("../../assets/img/image_placeholder.jpg")}
                                alt="..."
                              />
                            </div>
                            <div className="fileinput-preview fileinput-exists thumbnail img-raised"></div>
                            <div>
                              <span className="btn btn-raised btn-round btn-default btn-file">
                                <span className="fileinput-new">
                                  Pilih Gambar
                                </span>
                                <span className="fileinput-exists">Ubah</span>
                                <input id="image" type="file" name="..." />
                              </span>
                              <button
                                id="remove-image"
                                className="btn btn-danger btn-round fileinput-exists"
                                data-dismiss="fileinput"
                              >
                                <i className="fa fa-times"></i> Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5 mr-auto">
                      <form className="form" onSubmit={this.handleSubmit}>
                        <div className="card-body">
                          <div className="description">
                            <h4 className="info-title">
                              Vaksin yang sudah diberikan
                            </h4>
                            <p>(optional)</p>
                            {[
                              {
                                name: "Feline panleukopenia",
                              },
                              {
                                name: "Feline herpes dan feline",
                              },
                              {
                                name: "Rabies",
                              },
                            ].map((d, i) => {
                              return (
                                <div key={i} className="form-check ">
                                  <label className="form-check-label">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="vaksin"
                                      value={i}
                                      onChange={this.handleChange}
                                    />
                                    {d.name}
                                    <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                    <input
                                      hidden
                                      id={`vaksin-${i}`}
                                      type="tel"
                                      maxLength={4}
                                      className="form-control mt-3"
                                      placeholder="Tahun..."
                                      onChange={this.handleSetYear}
                                    />
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                          <h4 className="info-title mt-5">
                            Biodata 
                          </h4>
                          {[
                            {
                              icon: "pets",
                              id: "name",
                              placeholder: "Nama Hewan peliharaan...",
                              type: "text",
                              maxLength: 50,
                            },
                            {
                              icon: "pets",
                              id: "umur",
                              placeholder: "Umur Hewan peliharaan...",
                              type: "tel",
                              maxLength: 2,
                            },
                          ].map((d, i) => {
                            return (
                              <div
                                key={i}
                                className={
                                  "form-group " +
                                  this.state.errors.includes(d.id)
                                    ? "has-danger"
                                    : null
                                }
                              >
                                {this.state.errors.includes(d.id) ? (
                                  <label
                                    for="exampleInput3"
                                    class="bmd-label-floating"
                                  >
                                    Error input
                                  </label>
                                ) : null}

                                <div className="input-group">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="material-icons">{d.icon}</i>
                                    </span>
                                  </div>
                                  <input
                                    id={d.id}
                                    type={d.type}
                                    maxLength={d.maxLength}
                                    className="form-control"
                                    placeholder={d.placeholder}
                                    onChange={this.handleChange}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="modal-footer justify-content-center">
                          <button
                            type="submit"
                            className="btn btn-success btn-round"
                          >
                            Tambah
                          </button>
                        </div>
                      </form>
                    </div>
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
  return {
    auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    tambahKartuSehat: (data) => dispatch(tambahKartuSehat(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(KartuSehatModal);
