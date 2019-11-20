import React from "react";
import { connect } from "react-redux";
import ItemShop from "./ItemShop";

class SearchTempalte extends React.Component {
  render() {
    const { search, auth, orderInComplete } = this.props;
    return (
      <>
        {search && search.length > 0 ? (
          <div className="row mt-5">
            {search.map((d, i) => {
              return (
                <ItemShop
                  auth={auth}
                  orderInComplete={orderInComplete}
                  key={i}
                  d={d}
                />
              );
            })}
          </div>
        ) : (
          <div
            className="row justify-content-center"
            style={{ height: "100vh" }}
          >
            <h1>Sorry Product Not Found...</h1>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const shop = ownProps.shop;
  const category = ownProps.category;
  const searchVal = ownProps.searchVal;
  const search =
    shop &&
    shop.filter(d => {
      return (
        d.category === category &&
        d.name.toLowerCase().indexOf(searchVal && searchVal.toLowerCase()) > -1
      );
    });
  console.log("search", searchVal);
  return {
    search: search
  };
};
export default connect(mapStateToProps)(SearchTempalte);
