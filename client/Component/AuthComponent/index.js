import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signIn, signUp, googleSignIn } from '../../actions/authActions';
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
      showSignup: false
    };
    this.handleShowSignin = this.handleShowSignin.bind(this);
    this.handleShowSignup = this.handleShowSignup.bind(this);
  }
  /**
   * @method showLogin
   * @returns {void}
   */
  handleShowSignin() {
    this.setState({
      showSignin: true,
      showSignup: false
    });
  }
  /**
   * @method showSignup
   * @returns {void}
   */
  handleShowSignup() {
    this.setState({
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
            showSignup={this.handleShowSignup}
            googleSignIn={this.props.googleSignIn}
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
  signUp: PropTypes.func.isRequired,
  googleSignIn: PropTypes.func.isRequired
};


export default connect(null, { signUp, signIn, googleSignIn })(Authentication);
