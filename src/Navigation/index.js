import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as routes from '../constants/routes';

import './style.css';

const Navigation = ({
  location: {pathname},
  organizationName,
  onOrganizationSearch,
}) => {
  const token = localStorage.getItem('token');
  return (
      <header className="Navigation">
        <div className="Navigation-Main">
          <div className="Navigation-link">
            <Link to={routes.PROFILE}>Profile</Link>
          </div>
          <div className="Navigation-link">
            <Link to={routes.MESSAGES}>Messages</Link>
          </div>
        </div>

        <div className="Navigation-Auth">
          <div className="Navigation-link" id="signIn">
            <Link to={routes.SIGNIN}>
            { token ? 'Logout' : 'Sign In' }
            </Link>
          </div>
          <div className="Navigation-link" id="signUp">
            <Link to={routes.SIGNUP}>
              Sign Up
            </Link>
          </div>
        </div>
      </header>
    );
}

export default withRouter(Navigation);
