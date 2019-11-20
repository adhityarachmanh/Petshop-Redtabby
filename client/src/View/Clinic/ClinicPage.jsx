import React from "react";
import BG_CLINIC from "../../assets/img/slider-3.jpg";
import { dataTabClinic } from "./data";
import "./clinic.css";

class ClinicPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fade: false };
  }
 
  render() {
    return (
      <div>
        <div
          className="page-header header-filter"
          data-parallax="true"
          style={styles}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1 className="title">Clinic.</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="main main-raised">
          <div className="container">
            <div className="section ">
              <div className="row">
                {" "}
                <div className="col-md-10 ml-auto mr-auto">
                  <ul
                    className="nav nav-pills nav-pills-info nav-pills-icons justify-content-center"
                    role="tablist"
                  >
                    {dataTabClinic.map((d, i) => {
                      return (
                        <li className="nav-item">
                          <a
                            onClick={() => this.setState({ fade: true })}
                            onAnimationEnd={() =>
                              this.setState({ fade: false })
                            }
                            className="nav-link"
                            href={`#tab-${i}`}
                            role="tab"
                            data-toggle="tab"
                          >
                            <img
                              height="80"
                              className=""
                              src={d.gambar}
                              alt=""
                            />
                            <br />
                            {d.nama}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                  <div className={`tab-content tab-space `}>
                    {dataTabClinic.map((d, i) => {
                      return (
                        <div
                          class={`tab-pane  ${
                            this.state.fade ? "animasi fadeInRight" : ""
                          } ${i === 0 ? "active" : ""}`}
                          id={`tab-${i}`}
                        >
                          <div className="row">
                            <div className="col-md-6 mt-5">
                              <img width="100%" src={d.content.gambar} alt="" />
                            </div>
                            <div className="col-md-6">
                              <h3 className="title text-info">
                                {d.content.judul}
                              </h3>
                              {d.content.text}
                             
                            </div>
                            
                          </div>
                        </div>
                      );
                    })}
                    
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
              <button onClick={()=>this.props.history.push("/contact-us")} className="btn btn-round btn-warning btn-md">Hubungi Kami</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  backgroundImage: `url('${BG_CLINIC}')`,
  height: "600px "
};

export default ClinicPage;
