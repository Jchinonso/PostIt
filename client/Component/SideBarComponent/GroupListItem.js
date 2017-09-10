import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Button } from 'react-bootstrap';

const GroupListItem = (props) => {
  const { onClick, group } = props;
  return (
    <li id="dashboard">
      <a
        className="card"
        onClick={onClick}
        href="#?"
      ><span>{ group.name}</span></a>
    </li>
  );
};

GroupListItem.propTypes = {
  group: PropTypes.objectOf.isRequired,
  onClick: PropTypes.func.isRequired
};


export default GroupListItem;
