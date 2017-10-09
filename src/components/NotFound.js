import React from 'react';
import { Link } from 'react-router';
import './NotFound.css';

const NotFound = () => (
  <div className="ui-g NotFound">
    <div className="ui-md-2 ui-lg-3" />
    <div className="ui-g-12 ui-md-8 ui-lg-6">
      <div className="not-found-wrapper">
        <h1>Page Not Found</h1>
        <p className="error-code">Error 404</p>
        <p>
          The page you requested could not be found, either contact your webmaster or try again.
          Use your browsers Back button to navigate to the page you have prevously come from
        </p>
        <p>
          Or you could just press this neat little button:
        </p>
        <p>
          <Link to="/" className="btn-anchor">Take Me Home</Link>
        </p>
      </div>
    </div>
    <div className="ui-md-2 ui-lg-3" />
  </div>
);

export default NotFound;

