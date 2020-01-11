import React from 'react';
import MessageItem from './MessageItem.js';
import { connect } from 'react-redux';
import { doLikeMessage } from '../actionCreator.js';


function mapStateToPropsMessageItem(state, props) {
  const messages = state.messageState.messages;
  const comments = state.commentState.comments;
  const message = messages[props.messageId];
  const likes = state.messageState.likes[props.messageId].count;

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
  };
}

function mapDispatchToPropsMessageItem(dispatch, props) {
  return {
    likeMessage: () => dispatch(doLikeMessage(props.messageId)),
  };
}

const ConnectedMessageItem = connect(mapStateToPropsMessageItem,
  mapDispatchToPropsMessageItem)(MessageItem);

export default ({ messageIds }) => {
  return (
    messageIds.map((id) => {
        return (
          <div key={id}>
            <ConnectedMessageItem messageId={id} />
          </div>
        )
      }
    )
  );
}
