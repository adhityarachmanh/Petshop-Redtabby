import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import Admin from "layouts/Admin.jsx";
import "assets/css/material-dashboard-react.css?v=1.7.0";
import "aos/dist/aos.css";
import "sweetalert2/src/sweetalert2.scss";
import LoginAdmin from "layouts/LoginAdmin";
const hist = createBrowserHistory();

class App extends React.Component {
  render() {
    return (
      <Router history={hist}>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/login-admin" component={LoginAdmin} />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </Router>
    );
  }
}

export default App;
