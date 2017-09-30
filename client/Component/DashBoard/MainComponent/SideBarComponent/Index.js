import React from 'react';
import $ from 'jquery';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import GroupListItem from './GroupListItem';
import { fetchGroups } from '../../../../actions/groupActions';


class SideBarComponent extends React.Component {
  componentDidMount() {
    this.props.fetchGroups();
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
          <a
            className="secondary-content modal-trigger"
            href="#modal1"
          >
            <span className="caption"> + </span></a>
        </li>
        <GroupListItem handleChangeGroup={this.props.handleChangeGroup} groups={this.props.groups} />
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.authReducer.user.username,
    groups: state.groupReducer.groups
  };
}

SideBarComponent.propTypes = {
  handleChangeGroup: Proptypes.func.isRequired,
  groups: Proptypes.arrayOf(Proptypes.object).isRequired,
  username: Proptypes.string.isRequired,
  fetchGroups: Proptypes.func.isRequired,
};

export default connect(mapStateToProps, { fetchGroups })(SideBarComponent);
