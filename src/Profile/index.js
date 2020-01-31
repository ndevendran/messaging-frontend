import React from 'react';
import { MessageList } from '../Messages/MessageList'
import { connect } from 'react-redux';

const mapStateToProps = (state, props) => {
  const user = state.profileState.currentUser;
  const messages = state.messageState.messages;
  const messageIds = state.messageState.messageIds.filter((id) => {
    const message = messages[id];
    return message.user === user.id;
  });

  return {
    user,
    messageIds,
  };
}

const Profile = ({ user, messageIds }) =>
    <div>
      <span>{user.username}</span>
      <MessageList messageIds={messageIds}/>
    </div>

export default connect(
  mapStateToProps,
)(Profile);
