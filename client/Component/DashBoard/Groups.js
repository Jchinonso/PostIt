import React, { Component, PropTypes } from 'react';
import GroupListItem from './GroupListItem';
import GroupListModalItem from './GroupListModalItem';
import { Modal, Glyphicon, Input, Button } from 'react-bootstrap';
import * as actions from '../../actions/actions';

export default class Groups extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      addGroupModal: false,
      groupName: '',
      description: '',
      moreGroupsModal: false
    };
    this.validateGroupName = this.validateGroupName.bind(this);
    this.handleChangeGroup = this.handleChangeGroup.bind(this);
    this.openAddGroupModal = this.openAddGroupModal.bind(this);
    this.closeAddGroupModal = this.closeAddGroupModal.bind(this);
    this.handleModalChange = this.handleModalChange.bind(this);
    this.handleModalSubmit = this.handleModalSubmit.bind(this);
  }

  handleChangeGroup(group) {
    if(this.state.moreGroupsModal) {
      this.closeMoreGroupsModal();
    }
    this.props.onClick(group);
  }
  openAddGroupModal() {
    event.preventDefault();
    this.setState({addGroupModal: true});
  }
  closeAddGroupModal() {
    event.preventDefault();
    this.setState({addGroupModal: false});
  }
  handleModalChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleModalSubmit(event) {
    const { groups, dispatch, socket } = this.props;
    event.preventDefault();
    if (this.state.groupName.length < 1) {
      this.refs.groupName.getInputDOMNode().focus();
    }
    if (this.state.groupName.length > 0 && groups.filter(group=> {
      return group.name === this.state.groupName.trim();
    }).length < 1) {
      const newGroup = {
        name: this.state.groupName.trim(),
        description: this.state.description.trim(),
      };
      dispatch(actions.createGroup(newgroup));
      this.handleChangeChannel(newGroup);
      socket.emit('new channel', newChannel);
      this.setState({groupName: ''});
      this.closeAddGroupModal();
    }
  }
  validateGroupName() {
    const { groups } = this.props;
    if (groups.filter(group => {
      return group.name === this.state.groupName.trim();
    }).length > 0) {
      return 'error';
    }
    return 'success';
  }
  openMoreGroupsModal() {
    event.preventDefault();
    this.setState({moreGroupsModal: true});
  }
  closeMoreGroupsModal() {
    event.preventDefault();
    this.setState({moreGroupsModal: false});
  }
  createGroupWithinModal() {
    this.closeMoreGroupsModal();
    this.openAddGroupModal();
  }
  render() {
    const { groups, messages } = this.props;
    const filteredGroups = groups.slice(0, 8);
    const moreGroupsBoolean = groups.length > 8;
    const restOfTheGroups = groups.slice(8);
    const newGroupModal = (
      <div>
        <Modal key={1} show={this.state.addGroupModal} onHide={this.closeAddGroupModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleModalSubmit} >
            <Input
              ref="channelName"
              type="text"
              help={this.validateGroupName() === 'error' && 'A group with that name already exists!'}
              bsStyle={this.validateGroupName}
              hasFeedback
              name="groupName"
              autoFocus="true"
              placeholder="Enter the Group name"
              value={this.state.groupName}
              onChange={this.handleModalChange}
            />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={::this.closeAddGroupModal}>Cancel</Button>
            <Button disabled={this.validateGroupName() === 'error' && 'true'} onClick={this.handleModalSubmit} type="submit">
              Create Group
            </Button>
          </Modal.Footer>
          </Modal>
      </div>
    );
    const moreGroupsModal = (
      <div style={{background: 'grey'}}>
        <Modal key={2} show={this.state.moreGroupsModal} onHide={this.closeMoreGroupsModal}>
          <Modal.Header closeButton >
            <Modal.Title>More Groups</Modal.Title>
            <a onClick={this.createGroupWithinModal} style={{'cursor': 'pointer', 'color': '#85BBE9'}}>
              Create a Group
            </a>
          </Modal.Header>
          <Modal.Body>
            <ul style={{height: 'auto', margin: '0', overflowY: 'auto', padding: '0'}}>
              {restOfTheGroups.map(group =>
                <GroupListModalItem group={group} key={group.id} onClick={this.handleChangeGroup} />
                )}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={this.closeMoreGroupsModal}>Cancel</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
    return (
      <section>
        <div>
          <span style={{paddingLeft: '0.8em', fontSize: '1.5em'}}>
            Channels
            <button onClick={this.openAddGroupModal} style={{fontSize: '0.8em', 'background': 'Transparent', marginLeft: '2.8em', 'backgroundRepeat': 'noRepeat', 'border': 'none', 'cursor': 'pointer', 'overflow': 'hidden', 'outline': 'none'}}>
              <Glyphicon glyph="plus" />
            </button>
          </span>
        </div>
          {newGroupModal}
        <div>
          <ul style={{display: 'flex', flexDirection: 'column', listStyle: 'none', margin: '0', overflowY: 'auto', padding: '0'}}>
            {filteredGroups.map(group =>
              <GroupListItem  style={{paddingLeft: '0.8em', background: '#2E6DA4', height: '0.7em'}} messageCount={messages.filter(msg => {
                return msg.GroupId === group.name;
              }).length} group={group} key={group.id} onClick={this.handleChangeGroup} />
            )}
          </ul>
          {moreGroupsBoolean && <a onClick={this.openMoreGroupsModal} style={{'cursor': 'pointer', 'color': '#85BBE9'}}> + {groups.length - 8} more...</a> }
          {moreGroupsModal}
        </div>
      </section>
    );
  }
}
