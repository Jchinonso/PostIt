import React from 'react';
import $ from 'jquery';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import CreateGroupModal from './CreateGroupModal';
import GroupListItem from './GroupListItem';
import { fetchGroups } from '../../actions/groupActions';


class SideBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: null,
      priority: 'normal'
    };

    this.handleChangeGroup = this.handleChangeGroup.bind(this);
  }
  componentDidMount() {
    this.props.fetchGroups();
  }
   /**
   * @method selectGroup
   * @returns {void}
   * @memberof TwoColumnDiv
   * @param {Object} event
   */
  handleChangeGroup(event) {
    event.preventDefault();
    this.setState({ selectedGroup: event.target.id });
  }
  render() {
    return (
      <ul id="slide-out" className="side-nav fixed z-depth-2 col s10 m3 l3 ">
        <li className="center no-padding">
          <div className="indigo darken-2 white-text" style={{ height: 180 }}>
            <div className="row">
              <i className="fa fa-user-circle fa-4x" style={{ marginTop: '5%' }} width={100} height={100} aria-hidden="true" />
              <p>
                {this.props.username }
              </p>
            </div>
          </div>
        </li>
        <li id="dashboard">
          <span>Groups</span>
          <a className="secondary-content modal-trigger" href="#modal1"><span className="caption"> + </span></a>
          <CreateGroupModal />
        </li>
        <GroupListItem handleChangeGroup={this.handleChangeGroup} groups={this.props.groups} />
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  groups: state.groups,
  username: state.auth.user.username
});
SideBarComponent.propTypes = {
  groups: Proptypes.objectOf.isRequired,
  username: Proptypes.string.isRequired,
};

export default connect(mapStateToProps, { fetchGroups })(SideBarComponent);
