import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import TrOrderItem from "./TrOrderItem";

class OrderItem extends React.Component {
  render() {
    const { myOrderItem } = this.props;
    return (
      <div class="col-lg-6 col-md-6 ml-auto mr-auto">
        <div class="card ">
          <div className="card-header card-header-info">
            <h3 className="card-title">Item Order</h3>
          </div>
          <div className="card-body">
            <table className="table responsive">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {myOrderItem &&
                  myOrderItem.map((d, i) => {
                    return <TrOrderItem key={i} data={d} />;
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const myOrder = ownProps.myOrder;
  const order_item = state.firestore.ordered.order_item;
  const filterItemOrder =
    order_item &&
    order_item.filter(d => {
      return d.order_id === myOrder.id;
    });

  return {
    myOrderItem: filterItemOrder
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "order_item" }])
)(OrderItem);
