import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createMessage } from '../../../actions/messageActions';
import MessageInputBox from './MessageInputBox.jsx';
import PriorityButtons from './PriorityButtons.jsx';


/**
 * @class MessageComposer
 * @extends {Component}
 */
class MessageArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      priority: 'normal',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setPriority = this.setPriority.bind(this);
    this.handleSubmitMessage = this.handleSubmitMessage.bind(this);
  }

  /**
   *
   * @method setPriority
   * @memberof ChatArea
   * @param {Object} event
   * @returns {void}
   */
  setPriority(event) {
    const priority = event.target.id;
    this.setState({
      priority
    });
  }

  /**
   *
   * @method handleSubmitMessage
   * @returns {void}
   * @memberof MessageArea
   * @param {any} event
   * @param {Function} callback
   */
  handleSubmitMessage(event) {
    const { priority, content } = this.state;
    const messageData = {
      content: content.trim(),
      priority
    };
    this.props.createMessage(this.props.activeGroup, messageData);
    this.setState({ content: '' });
  }

  /**
   *
   * @method handleInputChange
   * @memberof MessageArea
   * @param {any} event
   * @returns {void}
   */
  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   *
   * @method render
   * @memberof MessageArea
   * @returns {object} a chat area component
  */

  render() {
    return (
      <div>
        {this.props.activeGroup ?
          <footer >
            <div className="message-input row">
              <form className="col s12">
                <div className="row">
                  <MessageInputBox
                    handleInputChange={this.handleInputChange}
                    handleSubmitMessage={this.handleSubmitMessage}
                    content={this.state.content}
                  />
                  <PriorityButtons setPriority={this.setPriority} defaultPriority={this.state.priority} />

                </div>
              </form>
            </div>
          </footer> : null
    }
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    activeGroup: state.activeGroupReducer,
    groups: state.groupReducer.groups
  };
}
MessageArea.defaultProps = {
  activeGroup: null
};
MessageArea.propTypes = {
  activeGroup: PropTypes.number,
  createMessage: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { createMessage })(MessageArea);
