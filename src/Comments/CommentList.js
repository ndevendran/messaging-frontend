import React from 'react';
import CommentItem from './CommentItem.js';
import { connect } from 'react-redux';

function mapStateToPropsCommentItem(state, props) {
  const comment = state.comments[props.commentId];
  return {
    comment,
  };
}

const ConnectedCommentItem = connect(mapStateToPropsCommentItem)(CommentItem);

export default({ commentIds }) => {
  return (
    commentIds.map(id => {
      return (
        <div key={id}>
          <ConnectedCommentItem commentId={id} />
        </div>
      );
    })
  );
}
