import React from 'react';
import Message from './Message.js';
import { connect } from 'react-redux';

function mapStateToProps(state, props) {
  const { router: { match: { params: { id, } } } } = props;
  const message = state.messageState.messages[id];
  const user = state.messageState.users[message.user];
  return {
    user,
    message,
  };
}

const MessageContainer = ({ message, comments, user = { username: "guest"}, router }) => {
  return (
    <div className="App-content_small-header">
      <Message message={message} user={user} />
    </div>
  );
}

export default connect(mapStateToProps)(MessageContainer);
