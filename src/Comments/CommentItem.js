import React from 'react';

const CommentItem =  ({ comment, commentId, user }) => {
  return (
    <div className="message-container">
    <div className="avatar"></div>
      <div className="message">
        <div className="header">
          {comment.user.username}
        </div>
        <div className="body">
          {comment.text}
        </div>
        <div className="footer"></div>
      </div>
    </div>
  );
};

export default CommentItem;
