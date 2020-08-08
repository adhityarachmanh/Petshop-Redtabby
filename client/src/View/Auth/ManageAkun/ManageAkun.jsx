import React from "react";
import { Switch, Route ,Redirect} from "react-router-dom";
import { dataTabManageAkun } from "./data";
import { Link } from "react-router-dom";
import BG_MANAGE_AKUN from "../../../assets/img/city-profile.jpg";
import { connect } from "react-redux";
import { compose } from "redux";
import Swal from "sweetalert2/dist/sweetalert2";
import { editProfileImage } from "../../../store/action/profileAction";

class ManageAkun extends React.Component {
  async handleChangeImage(auth) {
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
          showCancelButton: true,
          cancelButtonText: "Cancel",
          showConfirmButton: true,
          confirmButtonText: "Yes Edit My Profile",
          reverseButtons: true
        }).then(result => {
          if (result.value) {
            const newData = {
              file: file,
              uid: this.props.auth.uid
            };
            this.props.editProfileImage(newData);
          }
        });
      };
      reader.readAsDataURL(file);
    }
  }
  render() {
    const { profile, auth, progress } = this.props;
    if (!auth.uid) return <Redirect to="/login-page" />;
    return (
      <>
        <div className="profile-page sidebar-collapse">
          {" "}
          <div
            className="page-header header-filter"
            data-parallax="true"
            style={styles}
          />
          <div className="main main-raised " style={{minHeight:"700px"}}>
            <div className="profile-content ">
              <div className="container">
                <div className="row ">
                  <div className="col-md-6 ml-auto mr-auto">
                    <div className="profile">
                      <div
                        style={{ cursor: "pointer" }}
                        title="click to edit"
                        onClick={() => this.handleChangeImage(auth)}
                        className="avatar"
                      >
                        <img
                          src={profile.photoURL}
                          className="img-raised rounded-circle img-fluid"
                        />
                      </div>

                      <div className="name">
                        <h3 className="title">{profile.name}</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 ml-auto mr-auto " >
                    <div className="profile-tabs">
                      <ul
                        className="nav nav-pills nav-pills-icons nav-pills-rose justify-content-center"
                        role="tablist"
                      >
                        {dataTabManageAkun.map((d, i) => {
                          return (
                            <li key={i} className="nav-item ">
                              <Link
                                className={`nav-link ${
                                  this.props.location.pathname ===
                                  this.props.match.url +
                                    "/" +
                                    d.name.toLowerCase().replace(/ /g, "-")
                                    ? "active "
                                    : null
                                }`}
                                to={`/manage-akun/${d.name
                                  .toLowerCase()
                                  .replace(/ /g, "-")}`}
                              >
                                <i className="material-icons">{d.icon}</i>
                                {d.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="tab-content pb-5">
                  {progress.status ? (
                    <div className="tab-pane active">
                      <div className="container">
                        <div className="row justify-content-center">
                          <div className="col-md-6">
                            <div className="progress-container text-center">
                              <span className="progress-badge ">
                                {progress.value + "%"}
                              </span>
                              <div className="progress">
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  aria-valuenow="25"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                  style={{ width: `${progress.value}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <Switch>
                    {dataTabManageAkun.map((d, i) => {
                      return (
                        <Route
                        key={i}
                          path={`/manage-akun/${d.name
                            .toLowerCase()
                            .replace(/ /g, "-")}`}
                          component={d.component}
                        />
                      );
                    })}
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const styles = {
  backgroundImage: `url('${BG_MANAGE_AKUN}')`
};

const mapStateToProps = state => {
  const profile = state.firebase.profile;
  const auth = state.firebase.auth;
  return {
    profile: profile,
    auth: auth,
    progress: {
      status: state.shared.progress,
      value: state.shared.progressVal
    }
  };
};
const mapDispatchToProps = dispatch => {
  return {
    editProfileImage: newData => dispatch(editProfileImage(newData))
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ManageAkun);
