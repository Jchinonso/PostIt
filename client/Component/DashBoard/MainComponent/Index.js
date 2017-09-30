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
import { fetchUsers, fetchGroupMembers } from '../../../actions/memberActions';

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: null,
      priority: 'normal'
    };
    this.handleChangeGroup = this.handleChangeGroup.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  handleChangeGroup(event) {
    event.preventDefault();
    this.props.selectGroup(event.target.id);
    this.props.getAllGroupMessages(event.target.id);
    this.props.fetchGroupMembers(event.target.id);
  }
  render() {
    return (
      <main>
        <SideBarComponent handleChangeGroup={this.handleChangeGroup} />
        <AddGroupUser />
        <AddGroupUserModal />
        <CreateGroupModal />
        <MessageBoardComponent messages={this.props.messages} username={this.props.username} />
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.groupMessagesReducer.messages,
    username: state.authReducer.user.username,
    groups: state.groupReducer.groups
  };
}


MainComponent.propTypes = {
  username: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  getAllGroupMessages: PropTypes.func.isRequired,
  selectGroup: PropTypes.func.isRequired,
  fetchGroupMembers: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired
};

export default
  connect(mapStateToProps, { getAllGroupMessages, selectGroup, fetchUsers, fetchGroupMembers })(MainComponent);
