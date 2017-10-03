import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavComponent from './NavComponent/Index';
import SideBarComponent from './SideBarComponent/Index';
import MainComponent from './MainComponent/Index';
import MessageArea from './MessageArea/Index';
import CreateGroupModal from './SideBarComponent/CreateGroupModal';
import { getAllGroupMessages } from '../../actions/messageActions';
import { selectGroup } from '../../actions/groupActions';
import { fetchGroupMembers } from '../../actions/memberActions';
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
    this.handleChangeGroup = this.handleChangeGroup.bind(this);
  }

  componentDidMount() {
    $(document).ready(() => {
      $('.modal').modal();
      $('.tooltipped').tooltip({ delay: 50 });
      $(".button-collapse").sideNav({
        menuWidth: 250
      });
    });
  }
  /**
  * Handle Change Group
  * @method handleChangeGroup
  * @member MainComponent
  * @param {object} groupId
  * @returns {function} a function that changes group and dispatches some actions
  */
  handleChangeGroup(groupId) {
    this.props.selectGroup((groupId));
    this.props.getAllGroupMessages(groupId);
    this.props.fetchGroupMembers(groupId);
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
        <header>
          <NavComponent signOut={this.handleSignOut} />
          <SideBarComponent handleChangeGroup={this.handleChangeGroup} />
        </header>
        <CreateGroupModal />
        <MainComponent />
        <MessageArea />
      </div>
    );
  }
}

Dashboard.propTypes = {
  signOut: PropTypes.func.isRequired,
  getAllGroupMessages: PropTypes.func.isRequired,
  selectGroup: PropTypes.func.isRequired,
  fetchGroupMembers: PropTypes.func.isRequired,
};

export default connect(null, { signOut, getAllGroupMessages, selectGroup, fetchGroupMembers   })(Dashboard);
