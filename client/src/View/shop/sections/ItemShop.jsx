import React from "react";
import { formatIDR } from "../../../store/action/formatAction";
import Swal from "sweetalert2/dist/sweetalert2";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../../store/action/cartAction";

class ItemShop extends React.Component {
  addToCart = data => {
    const { history, auth, orderInComplete } = this.props;
    if (!auth.uid) {
      history.push("/login-page");
      return;
    }
    if (orderInComplete.length !== 0) {
      Swal.fire({
        type: "error",
        title: "Oops Your Order Not Complete...",
        text: " You Cant Add Item To Cart Now!",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok!"
      });
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      text: data.name,
      type: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add To Cart!"
    }).then(result => {
      if (result.value) {
        this.props.addToCart({
          uid: auth.uid,
          data: data
        });
      }
    });
  };
  detailProduct = d => {
    Swal.fire({
      title: d.name,
      html: `<p class="text-justify">${d.description}</p>`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Add To Cart",
      cancelButtonColor: "red"
    }).then(res => {
      if (res.value) {
        this.addToCart(d);
      }
    });
  };
  handleZoom=d=>{
    Swal.fire({
      imageUrl: d.image,
      imageHeight: 500,
      imageAlt: d.name
    })
  }
  render() {
    const { d } = this.props;
    return (
      <div class="col-md-3 ">
        <div title={d.name} class="card">
          <div class="card-header card-header-rose">
            <h4 class="card-title wrap">
              {d.name.substring(0, 15)}
              {d.name.length > 15 ? "..." : null}
            </h4>
            <img
              onClick={() => this.handleZoom(d)}
              style={{ cursor: "zoom-in" }}
              width="100%"
              height="200px"
              src={d.image}
              alt=""
            />
          </div>
          <div class="card-body">
            <p>IDR {formatIDR(d.price)}</p>
            <button
              onClick={() => this.addToCart(d)}
              className="btn btn-outline-success btn-sm"
            >
              Add To Cart
            </button>
            <button
              onClick={() => this.detailProduct(d)}
              className="btn btn-info btn-sm"
            >
              Detail Product
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: data => dispatch(addToCart(data))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(ItemShop);
