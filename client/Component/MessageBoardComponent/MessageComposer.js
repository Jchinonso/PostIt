import React, { Component } from 'react';
import Proptypes from 'prop-types';

/**
 * @class MessageComposer
 * @extends {Component}
 */
class MessageComposer extends Component {
  /**
   * Creates an instance of MessageComposer.
   * @param {any} props
   * @memberof ChatInput
   */
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
  }

  /**
   *
   * @method handleInputChange
   * @memberof MessageComposer
   * @param {any} event
   * @returns {void}
   */
  handleInputChange(event) {
    this.setState({ message: event.target.value });
  }

  /**
   *
   * @method clearMessage
   * @memberof MessageComposer
   * @param {any} event
   * @returns {void}
   */
  clearMessage() {
    this.setState({ message: '' });
  }

  /**
   *
   * @returns {Object} a JSX Object
   * @memberof MessageComposer
   */
  render() {
    const { onSubmit } = this.props;
    const { message } = this.state;
    return (
      <div className="input-container">
        <div id="message-input">
          <textarea type="text" onChange={this.handleInputChange} value={message} />
        </div>
        <button className="waves-effect waves-light btn" onClick={() => onSubmit(message, this.clearMessage)}>
          Send
        </button>
      </div>
    );
  }
}

MessageComposer.propTypes = {
  onSubmit: Proptypes.func.isRequired
};

export default MessageComposer;
