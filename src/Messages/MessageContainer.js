import React from 'react';
import Message from './Message.js';

const MessageContainer = ({ message }) => {
  return (
    <div className="App-content_small-header">
      <Message message={message} />
    </div>
  );
}

// export default connect(mapStateToProps)(MessageContainer);
export default MessageContainer;
