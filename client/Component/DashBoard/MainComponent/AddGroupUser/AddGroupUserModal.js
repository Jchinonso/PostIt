import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Chips from 'react-chips';
import { addMemberToGroup } from '../../../../actions/memberActions';

class AddGroupUserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: []
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  handleOnChange(chips) {
    this.setState({
      members: chips
    });
  }
  handleOnClick(event) {
    event.preventDefault();
    this.props.addMemberToGroup(this.props.activeGroup, this.state.username);
  }
  render() {
    const allUsers = this.props.allUsers;
    const groupMembers = this.props.groupMembers;
    let allUsernames;
    if (groupMembers) {
      allUsernames = allUsers.filter(user => !groupMembers
        .find(existing => existing.id === user.id))
        .map(user => user.username);
    }
    return (
      <div id="add-user" className="modal modal-fixed-footer" style={{ zIndex: 1051, opacity: 1, transform: 'scaleX(1)', top: '10%' }}>
        <div className="modal-content">
          <h4>Add Members</h4>
          <form>
            <div className="create-group">
              <div>
                <Chips
                  value={this.state.members}
                  onChange={this.handleOnChange}
                  suggestions={allUsernames}
                  placeholder="Enter Username"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            onClick={this.handleOnClick}
            className="modal-action modal-close waves-effect waves-green btn-flat"
          >
            Create
            <i className="material-icons right">send</i>
          </a>
        </div>
      </div>
    );
  }
}

AddGroupUserModal.propTypes = {
  addMemberToGroup: PropTypes.func.isRequired,
  allUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  groupMembers: PropTypes.arrayOf(PropTypes.object).isRequired,
};
function mapStateToProp(state) {
  return {
    allUsers: state.membersReducer.users,
    groupMembers: state.groupMembersReducer.members
  };
}


export default connect(mapStateToProp,
  { addMemberToGroup })(AddGroupUserModal);
