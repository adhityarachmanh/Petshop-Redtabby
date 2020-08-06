import React, { Component } from "react";

export default class KartuSehatModal extends Component {
  constructor() {
    super();
    this.state = {
      vaksin: [],
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
          vaksin: e.target.value,
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
  handleSubmit=(e)=>{
    const errors=[]
    const {name,old,image,vaksin} =this.state
    e.preventDefault()

    if (!name) errors.push("name")
    if (!old) errors.push("old")
    if (!image) errors.push("image")
    if (!image) errors.push("old")


  }
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
                                <div key={i} className="form-check">
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
                                      maxLength={4}
                                      type="text"
                                      className="form-control mt-3"
                                      placeholder="Tahun..."
                                    />
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                          <h4 className="info-title mt-5">
                            Biodata Hewan Peliharaan
                          </h4>
                          {[
                            {
                              icon: "pets",
                              id: "name",
                              placeholder: "Nama Hewan peliharaan...",
                            },
                            {
                              icon: "pets",
                              id: "old",
                              placeholder: "Umur Hewan peliharaan...",
                            },
                          ].map((d, i) => {
                            return (
                              <div key={i} className="form-group">
                                <div className="input-group">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="material-icons">{d.icon}</i>
                                    </span>
                                  </div>
                                  <input
                                  id={d.id}
                                    type="text"
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
