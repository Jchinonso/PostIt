import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeaderComponent from './HeaderComponent/Index';
import MainComponent from './MainComponent/Index';
import MessageArea from './MessageArea/Index';
import { signOut } from '../../actions/authActions';


/**
 * @class AddGroupUserModal
 * @extends React.Component
 */
class Dashboard extends React.Component {

  /**
 * @constructor
 * @extends React.Component
 * @param {object} props
 */
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    $(document).ready(() => {
      $('.modal').modal();
      $('.tooltipped').tooltip({ delay: 50 });
    });
  }

  /**
   * Handle signout event
   * @method handleOnChange
   * @member Dashboard
   * @param {object} event
   * @returns {function} a function that dispatch signOut action
   */
  handleSignOut(event) {
    this.props.signOut();
  }

  /**
   * render component
   * @method render
   * @member Dashbaord
   * @returns {object} component
   */
  render() {
    return (
      <div>
        <HeaderComponent signOut={this.handleSignOut} />
        <MainComponent />
        <MessageArea />
      </div>
    );
  }
}

Dashboard.propTypes = {
  signOut: PropTypes.func.isRequired
};

export default connect(null, { signOut })(Dashboard);
