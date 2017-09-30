import React from 'react';
import Proptypes from 'prop-types';
import moment from 'moment';

const MessageBoardComponent = (props) => {
  const { messages, username } = props;
  return (
    <div className="message-board" style={{ paddingBottom: '10%' }}>
      {messages && messages.length !== 0 && messages.map(message =>
        (<div className="message-box card" key={message.id}>
          <div className="row" style={{ minWidth: '100%', marginBottom: '-24px' }}>
            <div className="col s10 left">
              <div className="message-text">
                <a><span className="author-name">{username}</span></a>
                <div className="message">{message.content}</div>
              </div>
            </div>
            <div className="col s2">
              <div className="row">
                <div className="message-text" style={{ }}>
                  <a><span className="author-name">{message.priority}</span></a>
                </div>
              </div>
              <div className="row">
                <div className="message-text" style={{ }}>
                  <a><span className="author-name">{moment(new Date(message.createdAt)).fromNow()}</span></a>
                </div>
              </div>
            </div>
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
