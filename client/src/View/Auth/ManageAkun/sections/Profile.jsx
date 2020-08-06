import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { editProfile } from "../../../../store/action/profileAction";

class Profile extends React.Component {
  state = {
    edit: false
  };
  handleChange = e => {
    if (e.target.value !== this.props.profile[e.target.id]) {
      //jika tidak sama dengan data sblmnya
      this.setState({
        edit: true,
        [e.target.id]: e.target.value
      });
    } else {
      delete this.state[e.target.id];
    }
  };
  handleSubmit = e => {
    e.preventDefault();

    delete this.state["edit"];
    this.props.editProfile({
      newData: this.state,
      uid: this.props.auth.uid
    });
    this.setState({
      edit: false
    });
  };
  render() {
    const { auth, profile } = this.props;
    const { edit } = this.state;
    return (
      <div class="tab-pane active">
        <div className="container">
          <div className="row justify-content-center">
          
            <div className="col-md-6">
            <h3 className="title">Edit Profile</h3>
              <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                  <label for="exampleInputEmail1">Email</label>
                  <input
                    type="text"
                    id="email"
                    className="form-control"
                   disabled
                    defaultValue={profile.email}
                  />
                </div>
                <div className="form-group">
                  <label for="exampleInputEmail1">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    onChange={this.handleChange}
                    defaultValue={profile.name}
                  />
                </div>
                <div className="form-group">
                  <label for="exampleInputEmail1">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    className="form-control"
                    onChange={this.handleChange}
                    defaultValue={profile.phone}
                  />
                </div>
                <div className="form-group">
                  <label for="exampleInputEmail1">Address</label>
                  <input
                    id="address"
                    type="text"
                    className="form-control"
                    onChange={this.handleChange}
                    defaultValue={profile.address}
                  />
                </div>
                {edit ? (
                  <div className="form-group">
                    <button className="btn btn-success btn-md">
                      Save Profile
                    </button>
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

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
    editProfile: data => dispatch(editProfile(data))
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Profile);
