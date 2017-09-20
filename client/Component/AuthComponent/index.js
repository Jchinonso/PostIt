import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signIn, signUp } from '../../actions/authActions';
import SignIn from './SignIn';
import SignUp from './SignUp';

/**
 * @class
 * @extends React.Component
 */
class Authentication extends React.Component {
  /**
   * @constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      showSignin: true,
      showSignup: false,
      showResetPassword: false
    };
    this.handleShowSignin = this.handleShowSignin.bind(this);
    this.handleShowSignup = this.handleShowSignup.bind(this);
    this.handleShowResetPassword = this.handleShowResetPassword.bind(this);
  }
  /**
   * @method showLogin
   * @returns {void}
   */
  handleShowSignin() {
    this.setState({
      showSignin: true,
      showSignup: false,
      showResetPassword: false
    });
  }
  /**
   * @method showSignup
   * @returns {void}
   */
  handleShowSignup() {
    this.setState({
      showSignin: false,
      showResetPassword: false,
      showSignup: true
    });
  }
    /**
   * @method showResetPassword
   * @returns {void}
   */
  handleShowResetPassword() {
    this.setState({
      showResetPassword: true,
      showSignin: false,
      showSignup: true
    });
  }
  /**
   * @method render
   * @returns {object} authentication component
   */
  render() {
    return (
      <div>
        <nav className="indigo">
          <div className="nav-wrapper" >
            <a href="#?" className="brand-logo center"> POST IT</a>
          </div>
        </nav>
        {
        // eslint-disable-next-line
        this.state.showSignin ?
        (
          <SignIn
            signIn={this.props.signIn}
            showResetPassword={this.handleShowResetPassword}
            showSignup={this.handleShowSignup}
          />
        ) : this.state.showSignup ?
        (
          <SignUp
            signUp={this.props.signUp}
            showSignin={this.handleShowSignin}
          />
        ) : null
              }
      </div>
    );
  }
}

Authentication.propTypes = {
  signIn: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired
};

export default connect(null, { signUp, signIn })(Authentication);
