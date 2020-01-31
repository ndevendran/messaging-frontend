import React from 'react';
import MessageItem from './MessageItem.js';
import { connect } from 'react-redux';


function mapStateToProps(state, props) {
  const messageIds = state.messageState.messageIds;
  return {
    messageIds,
  };
}

const MessageList =  ({ messageIds, messages }) => {
  return (
    messages.map((message) => {
        return (
          <div key={message.id}>
            <MessageItem messageId={message.id} message={message} />
          </div>
        )
      }
    )
  );
}

export { MessageList };

export default connect(mapStateToProps)(MessageList);
