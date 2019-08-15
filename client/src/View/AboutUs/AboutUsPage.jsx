import React from "react";

class AboutUsPage extends React.Component {
  render() {
    return (
      <>
        <div className="page-header " style={styles.pageHeader}>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1 className="title">About Us.</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="main main-raised">
          <div className="container">
            <div className="section">
              <div className="row justify-content-center text-center">
                <h2 className="title">
                  History
                  <hr style={styles.hr} />
                </h2>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <img
                    width="100%"
                    src={require("../../assets/img/location.jpg")}
                    alt=""
                  />
                </div>
                <div className="col-md-6">
                  <p className="text-justify">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Quasi voluptate pariatur, nulla a reiciendis ipsa, officia
                    voluptatem natus in, ea cumque omnis nesciunt dolor dolores
                    molestiae corrupti architecto! Cum, perferendis.
                  </p>
                  <p className="text-justify">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Quasi voluptate pariatur, nulla a reiciendis ipsa, officia
                    voluptatem natus in, ea cumque omnis nesciunt dolor dolores
                    molestiae corrupti architecto! Cum, perferendis.
                  </p>
                  <p className="text-justify">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Quasi voluptate pariatur, nulla a reiciendis ipsa, officia
                    voluptatem natus in, ea cumque omnis nesciunt dolor dolores
                    molestiae corrupti architecto! Cum, perferendis.
                  </p>
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
  pageHeader: {
    backgroundColor: "#e91e63",
    height: "600px"
  },
  hr: {
    borderBottom: "solid 2px grey",
    width: "50%"
  }
};

export default AboutUsPage;
