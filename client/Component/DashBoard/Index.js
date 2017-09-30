import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeaderComponent from './HeaderComponent/Index';
import MainComponent from './MainComponent/Index';
import MessageArea from './MessageArea/Index';
import { signOut } from '../../actions/authActions';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSignOut = this.handleSignOut.bind(this);
  }
  handleSignOut(event) {
    this.props.signOut();
  }
  render() {
    return (
      <div>
        <HeaderComponent signOut={this.handleSignOut} />
        <MainComponent />
        <MessageArea />
      </div>
    );
  }
}

Dashboard.propTypes = {
  signOut: PropTypes.func.isRequired
};

export default connect(null, { signOut })(Dashboard);
