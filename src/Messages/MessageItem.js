import React from 'react';
import MessageFooter from './MessageFooter.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { doLikeMessage } from '../actionCreator.js'

function mapStateToProps(state, props) {
  const message = state.messageState.messages[props.messageId];
  const comments = state.commentState.comments;
  const likes = state.messageState.likes[props.messageId].count;
  const user = state.messageState.users[message.user];

  let commentCount = 0;
  for(var key in comments) {
    if(comments[key]["messageId"] === props.messageId) {
      commentCount++;
    }
  };

  return {
    message,
    likes,
    commentCount,
    user,
  };
}



function mapDispatchToProps(dispatch, props) {
  return {
    likeMessage: () => dispatch(doLikeMessage(props.messageId)),
  };
}

const MessageItem = ({ message, likes, likeMessage, commentCount, user }) => {
  return (
    <div className="message">
      <Link to={`/view/${message.id}`}>
      <div className="header">
        <small>{user.username}</small>
      </div>
      <div className="body">
        <p>{message.text}</p>
      </div>
      </Link>
      <div className="footer">
        <MessageFooter likes={likes}
          likeMessage={likeMessage}
          message={message}
          commentCount={commentCount}
        />
      </div>

    </div>
  );
};

export default connect(mapStateToProps,
  mapDispatchToProps)(MessageItem);
