import React, { PropTypes } from 'react';
import toastr from 'toastr';
import { browserHistory } from 'react-router';
/**
 * @class SignUp
 * @extends React.Component
 */
class SignUp extends React.Component {
  /**
   * @constructor
   * @extends React.Component
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  /**
   * Handle onChange events on form inputs
   * @method handleInputChange
   * @member SignUp
   * @param {object} event
   * @returns {function} a function that handles change event on inputs
   */
  handleInputChange(event) {
    event.preventDefault();
    const inputName = event.target.name;
    const inputValue = event.target.value;
    this.setState({ [inputName]: inputValue });
  }
  /**
   * Handle onSubmit events on form inputs
   * @method handleOnSubmit
   * @member SignUp
   * @param {object} event
   * @returns {function} a function that handles submit event on inputs
   */
  handleOnSubmit(event) {
    event.preventDefault();
    this.props.signUp(this.state);
  }

  /**
   * render component
   * @method render
   * @member SignUp
   * @returns {object} component
   */
  render() {
    return (
      <div className="card auth">
        <div className="col s12 m12 l6">
          <div className="card-panel">
            <h4 className="header2 center">Sign Up</h4>
            <div className="row">
              <form className="col s12" onSubmit={this.handleOnSubmit}>
                <div className="row">
                  <div className="input-field col s12" style={{ margin: 0 }}>
                    <i className="material-icons prefix">account_circle</i>
                    <input
                      id="name4"
                      onChange={this.handleInputChange}
                      type="text"
                      name="username"
                      className="validate"
                    />
                    <label htmlFor="first_name">username</label>
                  </div>
                </div>
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
                  <div className="input-field col s12" style={{ margin: 0 }}>
                    <i className="material-icons prefix">phone</i>
                    <input
                      id="icon_telephone"
                      type="tel"
                      name="phoneNumber"
                      onChange={this.handleInputChange}
                      className="validate"
                    />
                    <label htmlFor="icon_telephone">Telephone</label>
                  </div>
                </div>
                <div className="row">
                  <div className="row">
                    <div className="input-field col s8" style={{ paddingLeft: '60px', margin: '0 auto', width: 'auto' }}>
                      <button
                        className="btn indigo waves-effect waves-light left"
                        type="submit"
                        name="action"
                      >
                        <i className="material-icons right">send</i>
                        Submit
                        </button>
                    </div>
                  </div>
                </div>
                <div className="center">Already have an account <a href="#?" onClick={this.props.showSignin}>Sign In</a></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
  showSignin: PropTypes.func.isRequired
};

export default SignUp;
