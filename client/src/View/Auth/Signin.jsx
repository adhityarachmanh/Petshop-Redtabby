import React from "react";
import { connect } from "react-redux";
import { gasLogin } from "../../store/action/authaction";
import MediaLogin from "../../components/LoginPage/media";
import { Redirect } from "react-router-dom";
import BG_LOGIN from "../../assets/img/BG_LOGIN.jpg";

class Signin extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.login(this.state);
  };
  render() {
    const { auth } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <div class="page-header header-filter" style={styles}>
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-md-6 ml-auto mr-auto">
              <div class="card card-login">
                <form onSubmit={this.handleSubmit}>
                  <div class="card-header card-header-rose text-center">
                    <h4 class="card-title">Login</h4>
                  </div>
                  <p class="description text-center">Red Taddy</p>
                  <div class="card-body">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="material-icons">mail</i>
                        </span>
                      </div>
                      <input
                        onChange={this.handleInput}
                        id="email"
                        type="email"
                        class="form-control"
                        placeholder="Email..."
                        required
                      />
                    </div>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="material-icons">lock_outline</i>
                        </span>
                      </div>
                      <input
                        onChange={this.handleInput}
                        id="password"
                        type="password"
                        class="form-control"
                        placeholder="Password..."
                        required
                      />
                    </div>
                  </div>
                  <div class="footer text-center">
                    <button type="submit" class="btn btn-rose  btn-wd btn-md">
                      SignIn
                    </button>
                  </div>
                  <MediaLogin />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const styles = {
  backgroundImage: `url('${BG_LOGIN}')`,
  backgroundSize: "cover",
  backgroundPosition: "top center"
};
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(gasLogin(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signin);
