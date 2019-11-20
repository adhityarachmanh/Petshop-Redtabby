import React from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Swal from "sweetalert2";


class UserInfo extends React.Component {
  handleInfoUser = THIS_USER => {
    Swal.fire({
      title: "Profile",
      imageUrl:THIS_USER.photoURL,
  
    });
  };
  render() {
    const { THIS_USER } = this.props;
    return (
      <Link onClick={() => this.handleInfoUser(THIS_USER)}>
        {THIS_USER.name}
      </Link>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const user = state.firestore.data.users;
  const THIS_USER = user ? user[ownProps.uid] : null;

  return {
    THIS_USER: THIS_USER
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "users" }])
)(UserInfo);
