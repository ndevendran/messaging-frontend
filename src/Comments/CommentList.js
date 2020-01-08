import React from 'react';
import CommentItem from './CommentItem.js';

export default({ comments }) => {
  return (
    comments.map(comment => {
      return (
        <div key={comment.id}>
          <CommentItem comment={comment} />
        </div>
      );
    })
  );
}
