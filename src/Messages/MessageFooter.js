import React from 'react';
import './messageStyle.css';

export default ({ likes, likeMessage, message, commentCount }) => {
  return (
    <div className="footer">
      <span className="likes" onClick={() => likeMessage(message.id)}>{likes} Likes</span>
      <span className="comments">  {commentCount} Comments</span>
    </div>
  );
}
