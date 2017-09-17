import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MessageBoardComponent from './MessageBoardComponent/Index';
import CreateGroupModal from './SideBarComponent/CreateGroupModal';
import SideBarComponent from './SideBarComponent/Index';
import { getAllGroupMessages } from '../../../actions/messageActions';
import { selectGroup } from '../../../actions/groupActions';

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: null,
      priority: 'normal'
    };
    this.handleChangeGroup = this.handleChangeGroup.bind(this);
  }

  handleChangeGroup(event) {
    event.preventDefault();
    this.props.selectGroup(event.target.id);
    this.props.getAllGroupMessages(event.target.id);
  }
  render() {
    return (
      <main>
        <SideBarComponent handleChangeGroup={this.handleChangeGroup} />
        <CreateGroupModal />
        <MessageBoardComponent messages={this.props.messages} username={this.props.username} />
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.activeGroupmessages,
    username: state.auth.user.username,
  };
}


MainComponent.propTypes = {
  username: Proptypes.string.isRequired,
  messages: Proptypes.arrayOf(Proptypes.array).isRequired,
  getAllGroupMessages: Proptypes.func.isRequired,
  selectGroup: Proptypes.func.isRequired
};

export default
  connect(mapStateToProps, { getAllGroupMessages, selectGroup })(MainComponent);
