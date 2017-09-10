import React, { PropTypes } from 'react';

const MessageBoardHeaderOptions =
({ showSearchUserView, showGroupMemberView }) =>
  (
    <ul id="dropdown1" className="dropdown-content">
      <li>
        <a href="#!"><i className="material-icons">library_add</i>Add User</a>
      </li>
      <li>
        <a href="#!"><i className="material-icons">group</i>Member List</a>
      </li>
      <li className="divider" />
    </ul>
  );

MessageBoardHeaderOptions.propTypes = {
  showSearchUserView: PropTypes.func.isRequired,
  showGroupMemberView: PropTypes.func.isRequired
};

export default MessageBoardHeaderOptions;

