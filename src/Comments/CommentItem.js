import React from 'react';

export default ({ comment, commentId, user }) => {
  return (
    <div className="comment">
      <div className="header">
        {user.username}
      </div>
      <div className="body">
        {comment.text}
      </div>
      <div className="footer"></div>
    </div>
  );
}
