import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createGroup } from '../../../../actions/actions';

class CreateGroupModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  handleOnChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleOnClick(event) {
    event.preventDefault();
    const group = {
      name: this.state.name,
      description: this.state.description
    };
    this.props.createGroup(group);
    this.setState({ name: '', description: '' });
  }
  render() {
    return (
      <div id="modal1" className="modal modal-fixed-footer" style={{ zIndex: 1051, opacity: 1, transform: 'scaleX(1)', top: '10%' }}>
        <div className="modal-content">
          <h4>Create a Group</h4>
          <form>
            <div className="input-field create-group">
              <input
                type="text"
                id="group_name"
                name="name"
                onChange={this.handleOnChange}
                placeholder="Enter Group Name"
                className="validate"
              />
              <input
                type="text"
                id="group_desc"
                name="description"
                onChange={this.handleOnChange}
                placeholder="Give A Group Description"
                className="validate"
              />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            onClick={this.handleOnClick}
            className="modal-action modal-close waves-effect waves-green btn-flat"
          >
            Create
            <i className="material-icons right">send</i>
          </a>
        </div>
      </div>
    );
  }
}


CreateGroupModal.propTypes = {
  createGroup: PropTypes.func.isRequired
};


export default connect((null), { createGroup })(CreateGroupModal);
