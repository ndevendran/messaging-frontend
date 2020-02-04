import React from 'react';
import MessageFooter from './MessageFooter.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { doLikeMessage } from '../actionCreator.js';
import { MONTHS } from '../constants/dateConstants.js';



function mapDispatchToProps(dispatch, props) {
  return {
    likeMessage: () => dispatch(doLikeMessage(props.messageId)),
  };
}

const MessageItem = ({ message, likeMessage, user }) => {
  const commentCount = message.comments.length;
  const createdAt = new Date(message.createdAt);
  const now = new Date();
  const month = createdAt.getMonth();
  const date = createdAt.getDate();
  if(date === now.getDate()) {
    //get hours passed here
  }

  const likes = message.likes.count;
  return (
    <div>
      <Link to={`/view/${message.id}`} className="message-container">
        <div className="avatar" ></div>
        <div className="message">
          <div className="header">
            <small></small>
            <small className="username">{message.user.username}</small>
            <small className="date">{MONTHS[month+1]} {date}</small>
          </div>
          <div className="body">
            {message.text}
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
