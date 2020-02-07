import React from 'react';
import { Link } from 'react-router-dom';
import ResponseItem from '../Common/ResponseItem.js';
import MessageFooter from '../Messages/MessageFooter.js';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';


const LIKE_MESSAGE = gql`
mutation($id: ID!) {
  likeMessage(id: $id)
}
`;

const MessageItem = ({ message, likeMessage, user }) => {
  const commentCount = message.comments.length;

  function updateLikes(mutationResult, message) {
    if(mutationResult.data.likeMessage) {
      //This breaks an immutable data structures rule. Refactor.
      message.likes.count++;
    }
  }

  return (
    <div>
      <Link className="messageLink" to={`/view/${message.id}`}>
          <ResponseItem response={message}
            likeResponse={likeMessage}
            commentCount={commentCount} />
      </Link>
      <Mutation mutation={LIKE_MESSAGE}
        variables={{ id: message.id }}
        update={(client, mutationResult) =>
          updateLikes(mutationResult, message)}
      >
      {
        (likeMessage, {data, loading, error}) => {
          return (
            <MessageFooter
              likeMessage={() => likeMessage().catch(err => null)}
              message={message}
            />
          );
        }
      }
      </Mutation>
    </div>
  );
};

export default MessageItem;
