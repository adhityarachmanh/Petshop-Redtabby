import React from "react";
import { dataMarketing } from "../../homepage/data";
import { Link } from "react-router-dom";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer footer-default">
        <div className="container">
          <nav className="float-left">
            <ul>
              {dataMarketing.map((d, i) => {
                return (
                  <li key={i}>
                    <Link to={d.path}>{d.judul}</Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        
        </div>
      </footer>
    );
  }
}

export default Footer;
