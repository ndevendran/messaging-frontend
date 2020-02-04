import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router-dom';

const CREATE_COMMENT = gql`
  mutation($text: String!, $messageId: ID!) {
    createComment(text: $text, messageId: $messageId) {
      id
      text
      user {
        id
        username
      }
    }
  }
`;

const COMMENTS_QUERY = gql`
query($messageId: ID!) {
  comments(messageId: $messageId) {
    edges {
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

class CreateComment extends React.Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem('token');

    this.state = {
      value: '',
      token,
    };

    this.onChangeComment = this.onChangeComment.bind(this);
    this.onCreateComment = this.onCreateComment.bind(this);
  }

  onChangeComment(event) {
    const value = event.target.value;
    this.setState(
      {
        value,
      }
    );
  }

  onCreateComment(client, mutationResult) {
    const comments = client.readQuery({
      query: COMMENTS_QUERY,
      variables: { messageId: this.props.messageId }
    });

    client.writeQuery({
      query: COMMENTS_QUERY,
      variables: { messageId: this.props.messageId },
      data: {
        comments: {
            ...comments.comments,
            edges: comments.comments
              .edges.concat(mutationResult.data.createComment),
        }
      }
    });

    this.setState({
      value: ''
    });
  }

  render() {
    if(this.state.token) {
      return (
        <div>
            <input type="text"
              value={this.state.value}
              onChange={this.onChangeComment}
            />
            <Mutation mutation={CREATE_COMMENT}
              variables={{
                text: this.state.value,
                messageId: this.props.messageId,
              }}
              update={this.onCreateComment}
              onCompleted={() => {
                const url = '/view/' + (this.props.messageId);
                this.props.router.history.push(url);
              }}
            >
              {(createComment, { data, loading, error }) => {
                if(error) {
                  return (
                    <div>
                      <div>Error creating message</div>
                      <button type="button" onClick={createComment}>Create Message</button>
                    </div>
                  );
                }
                return (
                  <button type="submit" onClick={createComment}>Create Comment</button>
                );
              }}
            </Mutation>
        </div>
      );
    } else {
      return (
        <div>Please Login To Comment...</div>
      );
    }
  }
}

export default CreateComment;
