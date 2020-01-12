import React from 'react';
import CommentList from '../Comments/CommentList.js';
import CreateComment from '../Comments/CreateComment.js';
import { createCommentAndAddToMessage } from '../actionCreator.js';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

function mapDispatchToPropsCreateComment(dispatch, props) {
  return {
    createComment: (text, messageId) => {
      dispatch(createCommentAndAddToMessage(text, uuid(), messageId, 1));
    }
  }
}

const ConnectedCreateComment = connect(null, mapDispatchToPropsCreateComment)
  (CreateComment);

export default ({ message, user }) => {
  return (
    <div className="message">
      <h1>{message.text}</h1>
      <h6>{user.username}</h6>
      <ConnectedCreateComment messageId={message.id} />
      <div className="comment-list">
        <CommentList commentIds={message.comments} />
      </div>
    </div>
  );
}
