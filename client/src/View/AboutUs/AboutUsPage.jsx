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
                  We Provide Everything You Need For Your Beloved Pet.
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
                    We believe all pets have the right to a healthy and happy
                    life, and through our online services Red Tabby hope to make
                    this true throughout Indonesia. The relationship between
                    human and pets have long been established and evolving
                    within eras.
                  </p>
                  <p className="text-justify">
                    Many of human have failed to understand the importance of
                    this relationship thus it affects the treatment of pets
                    which causes to mistreated, malnourished, and unhappy pets.
                    Our founder believes “Human can make choices for their life
                    and also improve their life but animals can’t”.
                  </p>
                  <p className="text-justify">
                    This inspires us to create an approach that can be
                    understood by everyone from pet owners to non-pet owners
                    that can increase human responsibility towards pets.
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
