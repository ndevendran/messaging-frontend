import React from 'react';
import CommentItem from './CommentItem.js';

export default({ commentIds }) => {
  return (
    commentIds.map(id => {
      return (
        <div key={id}>
          <CommentItem commentId={id} />
        </div>
      );
    })
  );
}
