import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "C:/Users/User/AppData/Local/Microsoft/TypeScript/3.5/node_modules/redux";
import { firestoreConnect } from "react-redux-firebase";

class NotificationOrder extends React.Component {
  state = {
    background: "red",
    color: "white"
  };
  componentDidMount() {
    window.addEventListener("scroll", this.gantiWarna);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.gantiWarna);
  }
  gantiWarna = () => {
    if (
      document.documentElement.scrollTop > 80 ||
      document.body.scrollTop > 80
    ) {
      this.setState({
        background: "white",
        color: "black"
      });
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      this.setState({
        background: "red",
        color: "white"
      });
    }
  };
  render() {
    const { orders } = this.props;
    return (
      <>
        {orders.id ? (
          <li className="dropdown nav-item ">
            <a
              href="#"
              className="dropdown-toggle nav-link"
              data-toggle="dropdown"
            >
              <i className="material-icons">notifications</i>{" "}
              <span
                style={{
                  background: this.state.background,
                  color: this.state.color,
                  borderRadius: "100%"
                }}
                className="my-auto px-1 "
              >
                {orders ? 1 : null}
              </span>
            </a>
            <div className="dropdown-menu dropdown-with-icons">
              {!orders.struk ? (
                <Link
                  to={`/order-page/${orders.id}`}
                  className="dropdown-item text-danger"
                >
                  <i className="material-icons">warning</i> Upload Struk
                </Link>
              ) : (
                <Link
                  to={`/order-page/${orders.id}`}
                  className="dropdown-item text-danger"
                >
                  <i className="material-icons">warning</i> Waiting Confirmation
                </Link>
              )}
            </div>
          </li>
        ) : null}
      </>
    );
  }
}
const mapStateToProps = state => {
  const order = state.firestore.ordered.order;
  const auth = state.firebase.auth;

  const findOrder = {
    ...(order &&
      order.find(d => {
        return d.uid === auth.uid && !d.status;
      }))
  };

  return {
    profile: state.firebase.profile,
    orders: findOrder
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "order" }])
)(NotificationOrder);
