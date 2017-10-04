import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MessageBoardComponent from './MessageBoardComponent/Index.jsx';
import AddGroupUser from './AddGroupUser/Index.jsx';
import AddGroupUserModal from './AddGroupUser/AddGroupUserModal.jsx';


/**
 * @class MainComponent
 * @extends React.Component
 */
class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: null,
      priority: 'normal'
    };
  }

  /**
   * render component
   * @method render
   * @member MainComponent
   * @returns {object} component
   */
  render() {
    $('.tooltipped').tooltip({delay: 50});
    return (
      <main>
        { this.props.activeGroup ?
          <AddGroupUser /> : null
        }
        {this.props.groups.length === 0 ?
          <div className="center">
            <h1>Create a New Group </h1>
          </div> : null
        }
        <AddGroupUserModal />
        <MessageBoardComponent messages={this.props.messages} username={this.props.username} />
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeGroup: state.activeGroupReducer,
    messages: state.groupMessagesReducer.messages,
    username: state.authReducer.user.username,
    groups: state.groupReducer.groups
  };
}

MainComponent.defaultProps = {
  activeGroup: null
};
MainComponent.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeGroup: PropTypes.number,
  username: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,

};


export default
  connect(mapStateToProps)(MainComponent);
