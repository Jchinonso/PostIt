import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { Link, browserHistory } from 'react-router';
import GoogleLogin from 'react-google-login';

/**
 * @class SignIn
 * @extends React.Component
 */
class SignIn extends React.Component {
  /**
   * @constructor
   * @extends React.Component
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  /**
   * Handle onChange events on form inputs
   * @method handleInputChange
   * @member SignIn
   * @param {object} event
   * @returns {function} a function that handles change event on inputs
   */
  handleInputChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
   * Handle onSubmit events on form inputs
   * @method handleOnSubmit
   * @member SignIn
   * @param {object} event
   * @returns {function} a function that handles submit event on inputs
   */

  handleOnSubmit(event) {
    event.preventDefault();
    if (this.state.email.length && this.state.password.length) {
      const userObj = {
        password: this.state.password,
        email: this.state.email,
      };
      this.props.signIn(userObj);
      this.setState({
        [event.target.name]: ''
      });
    }
  }

  responseGoogle(response) {
    const { email, givenName, familyName } = response.profileObj;
    const userObj = {
      username: givenName,
      email,
      password: familyName,
      phoneNumber: '08139308818',
    };

    this.props.googleSignIn(userObj);
  }

  /**
   * render component
   * @method render
   * @member SignIn
   * @returns {object} component
   */
  render() {
    return (
      <div className="card auth">
        <div className="col s12 m12 l6">
          <div className="card-panel">
            <h4 className="header2 center" style={{ fontFamily: 'Bree Serif' }}>Sign In</h4>
            <div className="row">
              <div className="col s12 m12 l12 center">
                <div className="container" id="google-button">
                  <GoogleLogin
                    clientId={'682330105302-4frgtepd1nj81n3gd82e97usq6ul0ier.apps.googleusercontent.com'}
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    style={{ width: '100%', }}
                    className="btn red waves-effect waves-light left"
                  >
                    <i className="fa fa-google-plus-official fa-4x" aria-hidden="true" />
                    <span> Login with Google</span>
                  </GoogleLogin>
                </div>
                <div className="col s12 m12 l12 center" style={{ paddingTop: '10px' }}> Or </div>
              </div>
            </div>
            <div className="row " style={{ paddingTop: '10px' }}>
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s12" style={{ margin: 0 }}>
                    <i className="material-icons prefix">email</i>
                    <input
                      id="email4"
                      type="email"
                      name="email"
                      onChange={this.handleInputChange}
                      className="validate"
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12" style={{ margin: 0 }}>
                    <i className="material-icons prefix">lock_outline</i>
                    <input
                      id="password5"
                      type="password"
                      name="password"
                      onChange={this.handleInputChange}
                      className="validate"
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                </div>
                <div className="row">
                  <div className="row">
                    <div className="input-field col s8" style={{ paddingLeft: '60px', margin: '0 auto', width: 'auto' }}>
                      <button
                        className="btn indigo waves-effect waves-light left"
                        type="submit"
                        name="action"
                        onClick={this.handleOnSubmit}
                      >
                        <i className="material-icons right">send</i>
                        Submit
                        </button>
                    </div>
                    <div className="col s4" style={{ marginLeft: '8%', width: 'auto', marginTop: '8px' }}> <Link to="/forgot-password">Forgot Password</Link></div>
                  </div>
                </div>
<<<<<<< HEAD:client/Component/AuthComponent/SignIn.js
                <div className="center">Don&apos;t have a PostIt account?<a href="#?" onClick={this.props.showSignup}>Sign Up</a></div>
=======
                <div className="center">Don&apos;t have a PostIt account? <a href="#?" onClick={this.props.showSignup}>Sign Up</a></div>
>>>>>>> 780ef42e71094f2f4d4e09b0c6074abdc0e9636d:client/Component/AuthComponent/SignIn.jsx
              </form>
              <Link to="/password/reset">Forgot Password</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  showSignup: PropTypes.func.isRequired,
  googleSignIn: PropTypes.func.isRequired
};

export default SignIn;
