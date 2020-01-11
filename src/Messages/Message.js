import React from 'react';
import CommentList from '../Comments/CommentList.js';

export default ({ message, user }) => {
  return (
    <div className="message">
      <h1>{message.text}</h1>
      <h6>{user.username}</h6>
      <div className="comment-list">
        <CommentList commentIds={message.comments} />
      </div>
    </div>
  );
}
