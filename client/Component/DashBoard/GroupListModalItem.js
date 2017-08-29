import React, { PropTypes } from 'react';
import classnames from 'classnames';

const GroupListModalItem = (props) => {
  const { group: selectedGroup, onClick, group } = props;
  return (
    <a
      className={classnames({ selected: group === selectedGroup })}
      style={{ cursor: 'hand', color: 'black' }}
      onClick={() => onClick(group)}>
      <li style={{ cursor: 'pointer' }}>
        <h5>{group.name}</h5>
      </li>
    </a>
  );
};

GroupListModalItem.propTypes = {
  group: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default GroupListModalItem;
