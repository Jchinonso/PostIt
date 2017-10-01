import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MessageBoardComponent from './MessageBoardComponent/Index';
import CreateGroupModal from './SideBarComponent/CreateGroupModal';
import SideBarComponent from './SideBarComponent/Index';
import AddGroupUser from './AddGroupUser/Index';
import AddGroupUserModal from './AddGroupUser/AddGroupUserModal';
import { getAllGroupMessages } from '../../../actions/messageActions';
import { selectGroup } from '../../../actions/groupActions';
import { fetchGroupMembers } from '../../../actions/memberActions';

/**
 * @class MainComponent
 * @extends React.Component
 */
class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: null,
      priority: 'normal'
    };
    this.handleChangeGroup = this.handleChangeGroup.bind(this);
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
   * render component
   * @method render
   * @member MainComponent
   * @returns {object} component
   */
  render() {
    $('.tooltipped').tooltip({delay: 50});
    return (
      <main>
        <SideBarComponent handleChangeGroup={this.handleChangeGroup} />
        { this.props.activeGroup ?
          <AddGroupUser /> : null
        }
        {this.props.groups.length === 0 ?
          <div className="center">
            <h1>Create a New Group </h1>
          </div> : null
        }

        <AddGroupUserModal />
        <CreateGroupModal />
        <MessageBoardComponent messages={this.props.messages} username={this.props.username} />
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeGroup: state.activeGroupReducer,
    messages: state.groupMessagesReducer.messages,
    username: state.authReducer.user.username,
    groups: state.groupReducer.groups
  };
}

MainComponent.defaultProps = {
  activeGroup: null
};
MainComponent.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeGroup: PropTypes.number,
  username: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  getAllGroupMessages: PropTypes.func.isRequired,
  selectGroup: PropTypes.func.isRequired,
  fetchGroupMembers: PropTypes.func.isRequired,
};


export default
  connect(mapStateToProps, { getAllGroupMessages, selectGroup, fetchGroupMembers })(MainComponent);
