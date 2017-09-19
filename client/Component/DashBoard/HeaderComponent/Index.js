import React from 'react';
import PropTypes from 'prop-types';

const HeaderComponent = ({ signOut }) => (
  <header>
    <div className="navbar-fixed">
      <nav className="indigo">
        <div className="nav-wrapper">
          <a href="#?" className="brand-logo center">Post It</a>
          <ul className="right hide-on-med-and-down">
            <li >
              <i
                className="fa fa-sign-out fa-2x right dropdown-button"
                aria-hidden="true"
                onClick={signOut}
                style={{ paddingRight: 10 }}
              />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
);

HeaderComponent.propTypes = {
  signOut: PropTypes.func
};
HeaderComponent.defaultProps = {
  signOut: null
};

export default HeaderComponent;
