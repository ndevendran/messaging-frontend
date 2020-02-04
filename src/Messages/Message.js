import React from 'react';
import CommentList from '../Comments/CommentList.js';
import CreateComment from '../Comments/CreateComment.js';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import './messageStyle.css';


const GET_MESSAGE = gql`
  query( $id: ID! ){
    message(id: $id) {
      id
      text
      user {
        id
        username
      }
      likes {
        count
      }
      comments {
        id
        text
        user {
          id
          username
        }
      }
    }
  }
`;

const Message = ({ router }) => {
  const id = router.match.params.id;
  return (
    <Query
      query={GET_MESSAGE}
      variables={{ id, }}
      notifyOnNetworkStatusChange
    >
    {({ data, error, loading, networkStatus }) => {
      if (error) console.log(error);
      if(loading || !data) {
        return (<div>Loading...</div>);
      }

      const message = data.message;
      return (
        <div className="container">
          <div className="message">
            <h1>{message.text}</h1>
            <h6>{message.user.username}</h6>
          </div>
          <CreateComment messageId={message.id} router={router} />
          <div className="comment-list">
            <CommentList messageId={message.id} />
          </div>
        </div>
      );
    }}
    </Query>
  );
}

export default Message;
