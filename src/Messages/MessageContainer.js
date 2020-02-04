import React from 'react';
import Message from './Message.js';

const MessageContainer = ({ router }) => {
  return (
    <div className="App-content_small-header">
      <Message router={router} />
    </div>
  );
}

// export default connect(mapStateToProps)(MessageContainer);
export default MessageContainer;
