import React from 'react';
import Proptypes from 'prop-types';

const GroupListItem = (props) => {
  const { handleChangeGroup, groups } = props;
  return (
    <ul>
      {groups.map(group =>
        (<li id="dashboard">
          <a
            className="card"
            onClick={handleChangeGroup}
            href="#?"
          ><span>{ group.name}</span></a>
        </li>)
      )}
    </ul>
  );
};

GroupListItem.propTypes = {
  groups: Proptypes.arrayOf(Proptypes.object).isRequired,
  handleChangeGroup: Proptypes.func.isRequired
};


export default GroupListItem;
