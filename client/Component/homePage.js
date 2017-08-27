import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import {
   Modal, Button, Form, Input
   } from 'react-bootstrap';
import { signUp, signIn } from '../actions/authActions';


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignUpModal: false,
      showSignInModal: false,
      username: '',
      password: '',
      email: '',
      phoneNumber: ''
    };
    this.OpenSignInModal = this.OpenSignInModal.bind(this);
    this.OpenSignUpModal = this.OpenSignUpModal.bind(this);
    this.CloseSignUpModal = this.CloseSignUpModal.bind(this);
    this.CloseSignInModal = this.CloseSignInModal.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    this.handleSignInSubmit = this.handleSignInSubmit.bind(this);
    this.handleSignUpChange = this.handleSignUpChange.bind(this);
    this.handleSignInChange = this.handleSignInChange.bind(this);
  }
  OpenSignUpModal() {
    this.setState({ showSignUpModal: true });
  }
  OpenSignInModal() {
    this.setState({ showSignInModal: true });
  }
  CloseSignInModal() {
    this.setState({ showSignInModal: false });
  }
  CloseSignUpModal() {
    this.setState({ showSignUpModal: false });
  }
  handleSignUpSubmit(event) {
    event.preventDefault();

    if (this.state.username.length && this.state.password.length && this.state.phoneNumber.length && this.state.email.length) {
      const userObj = {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber
      };
      this.props.signUp(userObj)
      .then(() => {
        toastr.success('Account Created Successfully');
      }, (err) => {
        console.log(err);
      });
    }
  }
  handleSignInSubmit(event) {
    event.preventDefault();
    console.log(this.state);

    if (this.state.email.length && this.state.password.length) {
      const userObj = {
        password: this.state.password,
        email: this.state.email,
      };
      this.props.signIn(userObj)
      .then(() => {
        toastr.error('login in successful').position('top-center');
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
  handleSignUpChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSignInChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  render() {
    const SignUpModal = (
      <Modal show={this.state.showSignUpModal} className="modal" onHide={this.CloseSignUpModal}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleSignUpSubmit} horizontal>
            <div style={{ marginBottom: 25 }} className="input-group">
              <span className="input-group-addon"><i className="glyphicon glyphicon-user" /></span>
              <Input
                type="text"
                name="username"
                ref="usernameInput"
                placeholder="Enter username"
                value={this.state.username}
                onChange={this.handleSignUpChange}
              />
            </div>
            <div style={{ marginBottom: 25 }} className="input-group">
              <span className="input-group-addon"><i className="glyphicon glyphicon-lock" /></span>
              <Input
                type="password"
                name="password"
                ref="passwordInput"
                placeholder="Enter password"
                value={this.state.password}
                onChange={this.handleSignUpChange}
              />
            </div>
            <div style={{ marginBottom: 25 }} className="input-group">
              <span className="input-group-addon"><i className="glyphicon glyphicon-envelope" /></span>
              <Input
                ref="emailInput"
                type="email"
                name="email"
                placeholder="Enter Email"
                value={this.state.email}
                onChange={this.handleSignUpChange}
              />
            </div>
            <div style={{ marginBottom: 25 }} className="input-group">
              <span className="input-group-addon"><i className="glyphicon glyphicon-phone" /></span>
              <Input
                ref="telephoneInput"
                type="text"
                pattern="^\d{3}-\d{4}-\d{4}$"
                name="phoneNumber"
                placeholder="Phone Number (Format 080-0000-0000)"
                value={this.state.phoneNumber}
                onChange={this.handleSignUpChange}
              />
            </div>
            <Button
              bsStyle="success"
              style={{ width: '100%', height: '4rem', marginTop: '2rem' }}
              name="submitButton"
              type="submit"
            >
              <p style={{ color: 'white', margin: '0', padding: '0', fontSize: '1.5em' }} >Sign Up</p>
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    );
    const SignInModal = (
      <Modal show={this.state.showSignInModal} className="signup" onHide={this.CloseSignInModal}>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleSignInSubmit}>
            <Input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={this.state.email}
              onChange={this.handleSignInChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handleSignInChange}
            />
            <Button
              bsStyle="success"
              style={{ width: '100%', height: '4rem', marginTop: '2rem' }}
              name="submitButton"
              type="submit"
            >
              <p style={{ color: 'white', margin: '0', padding: '0', fontSize: '1.5em' }} >Sign In</p>
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    );
    return (
      <div className="site-wrapper" style={{ marginTop: '200px' }}>
        <div className="site-wrapper-inner">
          <div className="cover-container">
            <div className="masthead clearfix">
              <div className="inner">
                <h3 className="masthead-brand" style={{ marginTop: 30 }}>Post It</h3>
                <nav className="main-nav">
                  <ul>
                    <li><a className="cd-signin" style={{ cursor: 'pointer' }} onClick={this.OpenSignInModal}>Sign in</a></li>
                    <li><a className="cd-signup" style={{ cursor: 'pointer' }} onClick={this.OpenSignUpModal}>Signup</a></li>
                  </ul>
                  {SignInModal}
                  {SignUpModal}
                </nav>
              </div>
            </div>
            <div className="inner cover">
              <h1 className="cover-heading">Post Your Messages</h1>
              <p className="lead">Get Notifications from your group members via sms and email</p>
              <p className="lead">
                <a href="#0" className="btn btn-lg btn-secondary cd-signup" onClick={this.OpenSignUpModal}>Create Account</a>
              </p>
            </div>
            <div className="mastfoot">
              <div className="inner">
                <p>Created by Johnson Chinonso<a href="https://twitter.com/johnprog"> @johnprog</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default connect(() => ({}), { signUp, signIn })(HomePage);

