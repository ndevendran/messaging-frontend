import React from 'react';

export default ({ likes, likeMessage, message, commentCount }) => {
  return (
    <div className="likes">
      <span onClick={() => likeMessage(message.id)}>{likes} Likes</span>
      <span>  {commentCount} Comments</span>
    </div>
  );
}
