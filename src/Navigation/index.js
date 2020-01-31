import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as routes from '../constants/routes';

import './style.css';

const Navigation = ({
  location: {pathname},
  organizationName,
  onOrganizationSearch,
}) => (
  <header className="Navigation">
    <div className="Navigation-link">
      <Link to={routes.PROFILE}>Profile</Link>
    </div>
    <div className="Navigation-link">
      <Link to={routes.MESSAGES}>Messages</Link>
    </div>
    <div className="Navigation-link">
      <Link to={routes.SIGNIN}>Sign In</Link>
    </div>
    </header>
);

export default withRouter(Navigation);
