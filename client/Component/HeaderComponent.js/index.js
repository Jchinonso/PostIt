import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ signOut }) => (
  <header>
    <nav className="indigo">
      <div className="nav-wrapper">
        <a href="#?" className="brand-logo center">Post It</a>
        <ul className="right hide-on-med-and-down">
          <li>
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
  </header>
);

Header.propTypes = {
  signOut: PropTypes.func
};
Header.defaultProps = {
  signOut: null
};

export default Header;
