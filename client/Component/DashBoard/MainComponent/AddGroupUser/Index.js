import React from 'react';
import PropTypes from 'prop-types';

const AddGroupUser = ({ handleClick }) =>
  (<div className="fixed-action-btn vertical">
    <a className="btn-floating btn-large red">
      <i className="large material-icons">mode_edit</i>
    </a>
    <ul>
      <li>
        <a
          href="#?"
          className="btn-floating blue btn tooltipped"
          data-position="left"
          data-delay="50"
          onClick={handleClick}
          data-tooltip="I am a tooltip"
        >
          <i className="material-icons">group_add</i>
        </a>
      </li>
    </ul>
  </div>);

AddGroupUser.propTypes = {
  handleClick: PropTypes.func.isRequired
};

export default AddGroupUser;
