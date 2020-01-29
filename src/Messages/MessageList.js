import React from 'react';
import MessageItem from './MessageItem.js';
import { connect } from 'react-redux';


function mapStateToProps(state, props) {
  const messageIds = state.messageState.messageIds;
  return {
    messageIds,
  };
}

const MessageList =  ({ messageIds }) => {
  return (
    messageIds.map((id) => {
        return (
          <div key={id}>
            <MessageItem messageId={id} />
          </div>
        )
      }
    )
  );
}

export { MessageList };

export default connect(mapStateToProps)(MessageList);
