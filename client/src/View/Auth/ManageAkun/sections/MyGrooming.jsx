import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import moment from "moment";
import { cancelGrooming } from "../../../../store/action/groomingAction";
import Swal from "sweetalert2/dist/sweetalert2";

class MyGrooming extends React.Component {
  handleCancelGrooming = d => {
    Swal.fire({
      title: "Are you sure?",
      type: "warning",
      text: "this section, delete your select grooming",
      showCancelButton: true,
      confirmButtonText: "delete grooming"
    }).then(res => {
      if (res.value) {
        this.props.cancelGrooming({
          id: d.id
        });
      }
    });
  };
  handleShowMessage = message => {
    Swal.fire({
      title: "Message",
      text: message
    });
  };
  render() {
    const { myGrooming } = this.props;

    return (
      <div class="tab-pane active">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <h3 className="title">My Grooming</h3>
              {myGrooming && myGrooming.length === 0 ? (
                <p className="text-center">No Results</p>
              ) : (
                <table className="table responsive ">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Message</th>
                      <th>Status</th>
                      <th>Tools</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myGrooming &&
                      myGrooming.map((d, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>

                            <td>{moment(d.tanggal).format("ll")}</td>
                            <td>{moment(d.tanggal).format("LT")}</td>
                            <td>
                              <button
                                onClick={() =>
                                  this.handleShowMessage(d.message)
                                }
                                className="btn btn-info btn-sm"
                              >
                                <i className="material-icons">visibility</i>
                              </button>
                            </td>
                            <td>
                              {d.status ? (
                                <p className="text-success">Grooming Success</p>
                              ) : (
                                <p className="text-warning">Not Availables</p>
                              )}
                            </td>
                            <td>
                              {d.status ? null : (
                                <button
                                  onClick={() => this.handleCancelGrooming(d)}
                                  className="btn btn-danger  btn-sm"
                                >
                                  <i className="material-icons">delete</i>
                                  Batalkan Grooming
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const grooming = state.firestore.ordered.grooming;
  const auth = state.firebase.auth;
  const myGrooming =
    grooming &&
    grooming.filter(d => {
      return d.uid === auth.uid;
    });
  console.log(myGrooming);
  return {
    myGrooming: myGrooming,
    auth: auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    cancelGrooming: data => dispatch(cancelGrooming(data))
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    { collection: "grooming", orderBy: ["created_at", "desc"] }
  ])
)(MyGrooming);
