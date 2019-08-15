import React from "react";
// import DOG_BG from "../../assets/img/pet-dog.jpeg";
import CAT_BG from "../../assets/img/pet-cat.jpeg";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";

import ItemShop from "./sections/ItemShop";
import SearchTempalte from "./sections/SearchTemplate";
import { Link } from "react-router-dom";

class ShopPage extends React.Component {
  state = {
    search: false
  };
  filterImage = pet => {
    if (pet === "cat") {
      return CAT_BG;
    }
  };
  handleSearch = e => {
    if (e.target.value !== "") {
      this.setState({
        search: true,
        searchVal: e.target.value
      });
    } else {
      this.setState({
        search: false,
        searchVal: null
      });
    }
  };
  render() {
    const {
      match,
      shop,
      auth,
      orderInComplete,
      history,
      categorys
    } = this.props;
    const { searchVal, search } = this.state;
    const image = this.filterImage(match.params.pet);
    const category = match.params.category.replace(/-/g, " ");
    return (
      <>
        <div
          className="page-header header-filter"
          data-parallax="true"
          style={{
            height: "500px",
            backgroundImage: `url('${image}')`
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1 className="title text-capitalize">{match.params.pet}</h1>
                <h2 className="title text-capitalize">{category}.</h2>
                <br />
              </div>
            </div>
          </div>
        </div>
        <div className="main main-raised">
          <div className="container">
            <div className="section text-center">
              <div className="row justify-content-center">
                <h3>Category</h3>
              </div>
              <div className="row justify-content-center">
                <ul className="nav nav-pills nav-pills-primary" role="tablist">
                  {categorys &&
                    categorys.map((d, i) => {
                      return (
                        <div className="col-md-4 col-sm-3">
                          <li key={i} className="nav-item">
                            <Link
                              to={`/shop/cat/${d.name
                                .toLowerCase()
                                .replace(/ /g, "-")}`}
                              className={`btn btn-round btn-block ${
                                d.name.toLowerCase().replace(/ /g, "-") ===
                                match.params.category
                                  ? "btn-rose"
                                  : "btn-default"
                              }`}
                            >
                              {d.name}
                            </Link>
                          </li>
                        </div>
                      );
                    })}
                </ul>
              </div>
              <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                  <input
                    onChange={this.handleSearch}
                    placeholder={
                      "Find Product " + category + " " + match.params.pet
                    }
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>

              {search ? (
                <SearchTempalte
                  orderInComplete={orderInComplete}
                  auth={auth}
                  shop={shop}
                  category={match.params.category}
                  searchVal={searchVal}
                />
              ) : (
                <div className="row mt-5">
                  <>
                    {shop &&
                      shop.map((d, i) => {
                        return (
                          <ItemShop
                            orderInComplete={orderInComplete}
                            auth={auth}
                            history={history}
                            key={i}
                            d={d}
                          />
                        );
                      })}
                  </>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  //data asal
  const shop = state.firestore.ordered.shop;
  const order = state.firestore.ordered.order;
  const auth = state.firebase.auth;
  const categorys = state.firestore.ordered.category;
  //manipulat
  let pet = ownProps.match.params.pet;
  let category = ownProps.match.params.category;

  //olah data
  const filterShop =
    shop &&
    shop.filter(d => {
      return d.pet.indexOf(pet) > -1 && d.category.indexOf(category) > -1;
    });
  //order titak komplit
  const filterOrderInComplete =
    order &&
    order.filter(d => {
      return d.uid === auth.uid && !d.status;
    });
  return {
    shop: filterShop,
    auth: auth,
    orderInComplete: filterOrderInComplete,
    categorys: categorys
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "shop" }, { collection: "category" }])
)(ShopPage);
