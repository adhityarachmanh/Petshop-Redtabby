import React from "react";
import { dataSlide } from "./data";
import AOS from "aos";
class Slider extends React.Component {
  state = {
    slider: 0
  };
  componentDidMount() {
    AOS.init();
    this.interval = setInterval(() => {
      this.setState(prevState => ({
        slider:
          prevState.slider !== dataSlide.length - 1 ? prevState.slider + 1 : 0
      }));
    }, 5000);
  }
  render() {
    return (
      <div
        class="page-header header-filter"
        data-parallax="true"
        style={{
          backgroundImage: `url(${dataSlide[this.state.slider].gambar})`,
          height:"700px"
        }}
      >
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <h1 class="title">
                <div data-aos="fade-down" data-duration="1500">
                  {" "}
                  If animals could talk,
                </div>
                <div data-aos="fade-left" data-duration="1500">
                  they'd say{" "}
                </div>
                <div data-aos="fade-up" data-duration="1500">
                  {" "}
                  Tabby!
                </div>
              </h1>

              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Slider;
