import React from "react";
import { dataMarketing } from "../../homepage/data";
import { Link } from "react-router-dom";

class Footer extends React.Component {
  render() {
    return (
      <footer class="footer footer-default">
        <div class="container">
          <nav class="float-left">
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
          <div class="copyright float-right">
            &copy;
            <script>document.write(new Date().getFullYear())</script>, made with{" "}
            <i class="material-icons">pets</i> by
            <Link to="/" >
              Xenna Gabriella
            </Link>{" "}
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
