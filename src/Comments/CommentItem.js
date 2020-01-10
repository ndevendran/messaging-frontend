import React from 'react';

export default ({ comment, commentId }) => {
  return (
    <div className="comment">
      <div className="header">
        {comment.user.username}
      </div>
      <div className="body">
        {comment.text}
      </div>
      <div className="footer"></div>
    </div>
  );
}
