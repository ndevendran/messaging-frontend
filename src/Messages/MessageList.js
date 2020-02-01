import React from 'react';
import MessageItem from './MessageItem.js';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';


function mapStateToProps(state, props) {
  const messageIds = state.messageState.messageIds;
  return {
    messageIds,
  };
}

const GET_MESSAGES = gql`
  {
    messages(limit: 100) {
      edges {
        id
        text
        user {
          username
          id
        }
        comments {
          id
          text
          user {
            username
            id
          }
        }
        likes {
          count
        }
      }

      pageInfo {
        hasNextPage
        endCursor
      }
  }
}
`;

const MessageList = () => {
  return (
    <Query query={GET_MESSAGES}>
      {({ data, loading }) => {
        if (loading || !data) {
          return <div>Loading...</div>;
        }

        const messages = data.messages.edges;
        return (
          messages.map((message) => {
              return (
                <div key={message.id}>
                  <MessageItem messageId={message.id} message={message} />
                </div>
              )
            }
          )
        );
      }}
    </Query>
  );
}

export { MessageList };

export default connect(mapStateToProps)(MessageList);
