import React from 'react';

const CommentItem =  ({ comment, commentId, user }) => {
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
};

export default CommentItem;
