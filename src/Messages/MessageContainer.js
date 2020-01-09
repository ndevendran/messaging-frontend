import React from 'react';
import Message from './Message.js';

export default ({ message, comments, router }) => {
  return (
    <div>
      <Message message={message} comments={comments} />
    </div>
  );
}
