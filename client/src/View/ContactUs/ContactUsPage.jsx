import React from "react";
import { dataContactUs } from "./data";

class ContactUsPage extends React.Component {
  render() {
    return (
      <>
        {" "}
        <div
          className="page-header page-filter"
          data-parallax="true"
          style={styles.pageHeader}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1 className="title">Contact Us.</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="main main-raised">
          <div className="container">
            <div className="section ">
              <div className="row">
                <div className="col-md-8 ml-auto mr-auto">
                  <h2 className="title text-center">
                    Get In Touch
                    <hr style={styles.underLine} />
                  </h2>
                </div>
              </div>
              <div class="features text-center">
                <div class="row">
                  {dataContactUs.map((d, i) => {
                    return (
                      <div key={i} class="col-md-3">
                        <div class="info">
                          <div class="icon icon-info">
                            {d.nama === "Whatsapp" ? (
                              <i class={d.icon} />
                            ) : (
                              <i class="material-icons">{d.icon}</i>
                            )}
                          </div>
                          <h4 class="info-title">{d.nama}</h4>
                          {d.text}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
           
            <div className="section">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.900067471869!2d106.85309731476943!3d-6.2768679954568824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f300a6414b3b%3A0xf2c99b6aeabbeac4!2spetshop+red+tabby!5e0!3m2!1sen!2sid!4v1563545368369!5m2!1sen!2sid"
                width="100%"
                height="450"
                frameborder="0"
                style={{ border: 0 }}
                allowfullscreen
              />
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
    height: "600px "
  },
  underLine: {
    borderBottom: "solid 3px #e91e63",
    width: "10%"
  }
};

export default ContactUsPage;
