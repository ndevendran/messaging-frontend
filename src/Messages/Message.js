import React from 'react';
import CommentList from '../Comments/CommentList.js';

export default ({ message, comments, commentIds }) => {
  return (
    <div className="message">
      <h1>{message.text}</h1>
      <h6>{message.user.username}</h6>
      <div className="comment-list">
        <CommentList comments={comments} commentIds={message.commentIds} />
      </div>
    </div>
  );
}
