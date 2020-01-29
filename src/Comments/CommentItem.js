import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state, props) {
  const comment = state.commentState.comments[props.commentId];
  const user = state.commentState.users[comment.user];
  return {
    comment,
    user,
  };
}

const CommentItem =  ({ comment, commentId, user }) => {
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
};

export default connect(mapStateToProps)(CommentItem);
