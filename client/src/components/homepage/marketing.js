import React from "react";
import { dataMarketing } from "./data";
import { Link } from "react-router-dom";
import AOS from "aos";

class Marketing extends React.Component {
  componentDidMount() {
    AOS.init();
  }
  render() {
    return (
      <>
        <div class="section text-center">
          <div class="row">
            <div class="col-md-8 ml-auto mr-auto">
              <h2 class="title" data-aos="fade-down">
                WELCOME TO OUR WEBSITE
              </h2>
              <h5
                class="description"
                data-aos="fadeIn"
                data-aos-duration="2000"
              >
                <blockquote class="blockquote text-center">
                  <p class="mb-0">
                    we provide grooming and clinic services for your pet.
                  </p>
                  
                </blockquote>
              </h5>
            </div>
          </div>
        </div>
        <div class="section text-center">
          {/* <h2 class="title">Here is our team</h2> */}
          <div class="team">
            <div class="row justify-content-center">
              {dataMarketing.map((d, i) => {
                return (
                  <div class="col-md-4">
                    <div class="team-player">
                      <div class="card card-plain">
                        <div class="col-md-6 ml-auto mr-auto">
                          <img
                            data-aos="fade-down"
                            src={d.gambar}
                            style={{ height: "150px" }}
                            class="img-raised rounded-circle img-fluid"
                          />
                        </div>
                        <h4 class="card-title" data-aos="fade-left">
                          {d.judul}
                          <br />
                        </h4>

                        <div
                          class="card-footer justify-content-center"
                          data-aos="fade-right"
                        >
                          <Link to={d.path} class="btn btn-rose btn-sm">
                            View Detail
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Marketing;
