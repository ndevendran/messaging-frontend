import React from 'react';
import MessageFooter from './MessageFooter.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { doLikeMessage } from '../actionCreator.js'



function mapDispatchToProps(dispatch, props) {
  return {
    likeMessage: () => dispatch(doLikeMessage(props.messageId)),
  };
}

const MessageItem = ({ message, likeMessage, user }) => {
  const commentCount = message.comments.length;
  const likes = message.likes.count;
  return (
    <div>
      <Link to={`/view/${message.id}`} className="message-container">
      <div className="avatar" ></div>
      <div className="message">
        <div className="header">
          <small>{message.user.username}</small>
        </div>
        <div className="body">
          <p>{message.text}</p>
        </div>
        <div>
          <MessageFooter likes={likes}
            likeMessage={likeMessage}
            message={message}
            commentCount={commentCount}
          />
          </div>
      </div>
      </Link>
    </div>
  );
};

export default connect(null,
  mapDispatchToProps)(MessageItem);
