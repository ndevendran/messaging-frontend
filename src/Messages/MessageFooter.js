import React from 'react';
import './messageStyle.css';

export default ({ likeMessage, message }) => {
  return (
    <div className="message-footer">
      <div className="footer">
        <span className="likes" onClick={() => likeMessage(message.id)}>
        {message.likes.count} Likes</span>
        <span className="comments">  {message.comments.length} Comments</span>
      </div>
    </div>
  );
}
