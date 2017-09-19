import React from 'react';
import Proptypes from 'prop-types';

const MessageBoardComponent = (props) => {
  const { messages, username } = props;
  return (
    <div className="message-board" >
      {messages.length !== 0 && messages.map(message =>
        (<div className="message-box card" priority="urgent">
          <div className="message-text">
            <a href><span className="author-name">{username}</span></a>
            <div className="message" contentEditable="true">{message.content}</div>
          </div>
        </div>)
      )}
    </div>
  );
};

MessageBoardComponent.propTypes = {
  messages: Proptypes.arrayOf(Proptypes.object).isRequired,
  username: Proptypes.string.isRequired
};


export default MessageBoardComponent;
