import React from 'react';
import Message from './Message.js';

export default ({ message, comments, user = { username: "guest"}, router }) => {
  return (
    <div>
      <Message message={message} user={user} />
    </div>
  );
}
