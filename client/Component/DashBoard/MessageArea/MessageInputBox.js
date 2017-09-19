import React, { Component } from 'react';
import PropTypes from 'prop-types';


const MessageInputBox = ({
   content,
   handleInputChange,
   handleSubmitMessage
  }) =>
  (
    <div className="input-field col s6">
      <div className="input-box">
        <i className="material-icons prefix">mode_edit</i>
        <input
          className="input-box_text"
          onChange={handleInputChange}
          onKeyPress={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              handleSubmitMessage();
            }
          }}
          name="content"
          value={content}
          placeholder="Write Message here"
          type="text"
        />
      </div>
    </div>
  );
MessageInputBox.propTypes = {
  content: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmitMessage: PropTypes.func.isRequired
};

export default MessageInputBox;
