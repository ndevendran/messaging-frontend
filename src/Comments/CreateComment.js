import React from 'react';
import gql from 'graphql-tag';
import CreateResponse from '../Common/CreateResponse';
import Error from '../Common/Error.js';

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
      error: null,
    };

    this.onChangeComment = this.onChangeComment.bind(this);
    this.onCreateComment = this.onCreateComment.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.onError = this.onError.bind(this);
    this.onErrorClear = this.onErrorClear.bind(this);
  }

  onErrorClear() {
    this.setState({
      error: null,
    });
  }

  onChangeComment(event) {
    const value = event.target.value;
    this.setState(
      {
        value,
      }
    );
  }

  onError(error) {
    this.setState({
      error: error.message,
    });
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

  onComplete() {
    const url = '/view/' + (this.props.messageId);
    this.props.router.history.push(url);
  }

  render() {
    if(this.state.token) {
      const error = this.state.error;
      return (
        <div>
          <CreateResponse
            update={this.onCreateComment}
            onComplete={this.onComplete}
            onError={this.onError}
            router={this.props.router}
            mutation={CREATE_COMMENT}
            variables={{
              text: this.state.value,
              messageId: this.props.messageId
            }}
            value={this.state.value}
            onChange={this.onChangeComment}
          >Create Comment</CreateResponse>
          {
            error && <Error error={error} />
          }
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
