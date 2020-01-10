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
        let commentCount = 0;
        for(var key in comments) {
          if(comments[key]["messageId"] === id) {
            commentCount++;
          }
        };

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
