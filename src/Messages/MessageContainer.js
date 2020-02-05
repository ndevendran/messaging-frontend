import React from 'react';
import Message from './Message.js';

const MessageContainer = ({ router }) => {
  return (
      <Message router={router} />
  );
}

// export default connect(mapStateToProps)(MessageContainer);
export default MessageContainer;
