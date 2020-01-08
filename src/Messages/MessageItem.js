import React from 'react';
import { Router, Link } from 'react-router-dom';

export default ({ message }) => {
  return (
    <div className="message">
      <Link to={`/view/${message.id}`}>
      <div className="header">
        <small>{message.user.username}</small>
      </div>
      <div className="body">
        <p>{message.text}</p>
      </div>
      <div className="footer">
      </div>
      </Link>
    </div>
  );
}
