import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ResponseItem from '../Common/ResponseItem.js';
import MessageFooter from '../Messages/MessageFooter.js';



function mapDispatchToProps(dispatch, props) {
  return {
    likeMessage: (event) => { console.log('Under construction...')},
  };
}

const MessageItem = ({ message, likeMessage, user }) => {
  const commentCount = message.comments.length;
  return (
    <div>
      <Link to={`/view/${message.id}`}>
          <ResponseItem response={message}
            likeResponse={likeMessage}
            commentCount={commentCount} />
      </Link>
      <MessageFooter
        likeMessage={likeMessage}
        message={message}
      />
    </div>
  );
};

export default connect(null,
  mapDispatchToProps)(MessageItem);
