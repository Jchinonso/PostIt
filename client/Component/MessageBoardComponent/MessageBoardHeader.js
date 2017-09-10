import React from 'react';
import PropTypes from 'prop-types';

const MessageBoardHeader = ({ name, description }) =>
  (<div className="group-header-flex row card">
    <div className="group-name col s9">
      <span>{name}</span>
      <span id="description">{description}</span>
    </div>
    <div className="menu col s3">
      <a className="dropdown-button" href="#!" data-activates="dropdown1">
        <i className="fa fa-ellipsis-h fa-2x" aria-hidden="true" />
      </a>
    </div>
  </div>);

MessageBoardHeader.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default MessageBoardHeader;
