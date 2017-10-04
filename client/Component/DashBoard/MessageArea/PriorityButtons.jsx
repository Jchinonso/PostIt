import React from 'react';
import PropTypes from 'prop-types';

const PriorityButtons = ({ defaultPriority, setPriority }) => (
  <div className="select-priority-2 col s2">
    <p>
      <input
        name="group1"
        type="radio"
        id="normal"
        checked={defaultPriority === 'normal'}
        onChange={setPriority}
      />
      <label htmlFor="normal">Normal</label>
    </p>
    <p>
      <input
        className="with-gap"
        name="group3"
        type="radio"
        id="urgent"
        checked={defaultPriority === 'urgent'}
        onChange={setPriority}
      />
      <label htmlFor="urgent">Urgent</label>
    </p>
    <p>
      <input
        className="with-gap"
        name="group3"
        type="radio"
        id="critical"
        checked={defaultPriority === 'critical'}
        onChange={setPriority}
      />
      <label htmlFor="critical">Critical</label>
    </p>
  </div>
);

PriorityButtons.propTypes = {
  defaultPriority: PropTypes.string.isRequired,
  setPriority: PropTypes.func.isRequired
};

export default PriorityButtons;
