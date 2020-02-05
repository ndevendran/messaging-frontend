import React from 'react';
import ResponseItem from '../Common/ResponseItem.js';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_COMMENTS = gql`
  query($messageId: ID!) {
    comments(messageId: $messageId) {
      edges {
        id
        createdAt
        text
        user {
          id
          username
        }
      }
    }
  }
`;



export default({ messageId }) => {
  return (
      <Query query={GET_COMMENTS} variables={{ messageId: messageId }}>
        {
          ({ data, loading, error }) => {

            if(loading || !data) {
              return (
                <div>Loading...</div>
              );
            }

            const comments = data.comments.edges;
            return (
              comments.map((comment) =>
                <div key={comment.id}>
                  <ResponseItem response={comment} />
                </div>
              )
            );
          }
        }
      </Query>
  );
}
