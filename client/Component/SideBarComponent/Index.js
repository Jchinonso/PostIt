import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CreateGroupModal from './CreateGroupModal';
import GroupListItem from './GroupListItem';
import

export class SideBarComponent extends React.Component{
  constructor(props) {
    super(props);
  }
  handleChangeGroup() {

  }
  render() {
    return (
      <ul id="slide-out" className="side-nav fixed z-depth-2 col s10 m3 l3 ">
        <li className="center no-padding">
          <div className="indigo darken-2 white-text" style={{ height: 180 }}>
            <div className="row">
              <i className="fa fa-user-circle fa-4x" style={{ marginTop: '5%' }} width={100} height={100} aria-hidden="true" />
              <p>
                { user.username}
              </p>
            </div>
          </div>
        </li>
        <li id="dashboard">
          <span>Groups</span>
          <a className="secondary-content modal-trigger" href="#modal1"><span className="caption"> + </span></a>
          <CreateGroupModal />
        </li>
        <GroupListItem onClick={() => {handleChangeGroup(group)}}/>
      </ul>
    );
  }
}

const mapStateToProps = state =>
  ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    groups: state.userGroups,
    selectedGroup: state.activeGroup,
  });

const mapDispatchToProps = dispatch =>
({
  exploreGroup: (group) => {
    dispatch(selectGroup(group));
    dispatch(getGroupMessages());
    dispatch(getGroupUsers());
  },
  loadUserGroups: () => {
    dispatch(fetchUserGroups());
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(SideBarComponent);
