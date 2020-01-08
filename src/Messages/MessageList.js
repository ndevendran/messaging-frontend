import React from 'react';
import MessageItem from './MessageItem.js';
import { withRouter } from 'react-router-dom';

export default ({ messages }) => {
  return (
    messages.map((message) =>
      <div key={message.id}>
        <MessageItem message={message} />
      </div>
    )
  );
}
