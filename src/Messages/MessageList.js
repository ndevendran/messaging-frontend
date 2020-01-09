import React from 'react';
import MessageItem from './MessageItem.js';
import { connect } from 'react-redux';


function mapStateToPropsMessageItem(state, props) {
  const messages = state.messages;
  const message = messages[props.messageId];
  return {
    message,
  };
}

const ConnectedMessageItem = connect(mapStateToPropsMessageItem)(MessageItem)

export default ({ messageIds, likes, likeMessage, comments }) => {
  return (
    messageIds.map((id) => {
        const likeCount = likes[id].count;
        const commentCount = comments.filter((comment) => comment.messageId === id).length;
        return (
          <div key={id}>
            <ConnectedMessageItem messageId={id} likes={likeCount}
              likeMessage={likeMessage}
              commentCount={commentCount}
            />
          </div>
        )
      }
    )
  );
}
