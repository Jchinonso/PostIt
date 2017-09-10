import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { Input } from 'react-bootstrap';

export default class MessageComposer extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      content: '',
    };
  }
  handleSubmit(event) {
    const { user, activeGroup } = this.props;
    const content = event.target.value.trim();
    if (event.which === 13) {
      event.preventDefault();
      const newMessage = {
        groupId: this.props.activeGroup.id,
        content,
        sender
      };
      this.props.onSave(newMessage);
      this.setState({ content: '' });
    }
  }
  handleChange(event) {
    this.setState({ content: event.target.value });
  }
  render() {
    return (
      <div style={{
        zIndex: '52',
        left: '21.1rem',
        right: '1rem',
        width: '100%',
        flexShrink: '0',
        order: '2',
        marginTop: '0.5em'
      }}>
        <Input
          style={{
            height: '100%',
            fontSize: '2em',
            marginBottom: '1em'
          }}
          type="textarea"
          name="message"
          ref="messageComposer"
          autoFocus="true"
          placeholder="Type here to chat!"
          value={this.state.content}
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleSubmit.binnd(this)}
        />
      </div>
    );
  }
}
