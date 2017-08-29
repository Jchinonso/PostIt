import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Button } from 'react-bootstrap';

const GroupListItem = (props) => {
  const { group: selectedGroup, onClick, group } = props;
  return (
    <Button bsSize="xsmall" bsStyle="primary" >
      <a
        className={classnames({ selected: group === selectedGroup })}
        style={{ cursor: 'hand', color: 'white'}}
        onClick={() => onClick(group)}
      >
        <li style={{ textAlign: 'left', cursor: 'pointer', marginLeft: '2em' }}>
          <h5>{group.name}</h5>
        </li>
      </a>
    </Button>
  );
};

GroupListItem.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default GroupListItem;
