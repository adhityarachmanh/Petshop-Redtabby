import React, { Component } from "react";
import Marketing from "../components/homepage/marketing";
import Slider from "../components/homepage/slider";

class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      indexSlide: 0
    };
  }
  render() {
    const { indexSlide } = this.state;
    return (
      <div>
        <Slider />
        <div class="main main-raised " >
          <div class="container">
           
          <Marketing/>
        
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
