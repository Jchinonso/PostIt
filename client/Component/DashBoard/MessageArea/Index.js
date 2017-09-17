import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createMessage } from '../../../actions/messageActions';
import MessageInputBox from './MessageInputBox';
import PriorityButtons from './PriorityButtons';


/**
 * @class MessageComposer
 * @extends {Component}
 */
class MessageArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      priority: '',
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
    if (content) {
      this.props.createMessage(this.props.selectedGroup, { content, priority });
    }
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
        {this.props.selectedGroup !== null &&
      this.props.groups.length !== 0 ?
        <footer style={{ paddingLeft: 300 }}>
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
    selectedGroup: state.activeGroup,
    groups: state.groups
  };
}

MessageArea.propTypes = {
  selectedGroup: PropTypes.string.isRequired,
  createMessage: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { createMessage })(MessageArea);
