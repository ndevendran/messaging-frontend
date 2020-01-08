import React from 'react';
import Message from './Message.js';

export default ({ messages, comments, router }) => {
  console.log(messages);
  const { match: { params: { id } } } = router;
  const message = messages.filter((message) => {return message.id == id});
  const filteredComments = comments.filter((comment) => { return comment.messageId == id});

  console.log(message);
  if(message.length > 1) {
    return (
      <div>
        <h1>Error: Duplicate IDs in messages</h1>
      </div>
    );
  }

  if(message.length === 0) {
    return (
      <div>
        <h1>Error: Message Does Not Exist</h1>
      </div>
    );
  }

  return (
    <div>
      <Message message={message[0]} comments={filteredComments} />
    </div>
  );
}
