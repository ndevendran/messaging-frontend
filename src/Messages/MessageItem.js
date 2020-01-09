import React from 'react';
import MessageFooter from './MessageFooter.js';
import { Link } from 'react-router-dom';

export default ({ message, likes, likeMessage, commentCount }) => {
  return (
    <div className="message">
      <Link to={`/view/${message.id}`}>
      <div className="header">
        <small>{message.user.username}</small>
      </div>
      <div className="body">
        <p>{message.text}</p>
      </div>
      </Link>
      <div className="footer">
        <MessageFooter likes={likes}
          likeMessage={likeMessage}
          message={message}
          commentCount={commentCount}
        />
      </div>

    </div>
  );
}
