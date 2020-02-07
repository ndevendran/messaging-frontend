import React from 'react';
import gql from 'graphql-tag';
import '../Messages/messageStyle.css';
import CreateOptions from '../Common/CreateOptions';

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
      return (
        <div className="create">
            <div className="avatar">Avatar belongs here</div>
            <div>
              <textarea className="textInput" rows="4" columns="40"
                value={this.state.value}
                onChange={this.onChangeComment}
              ></textarea>
              <CreateOptions
                updateMessages={this.onCreateComment}
                onComplete={this.onComplete}
                onError={this.onError}
                router={this.props.router}
                mutation={CREATE_COMMENT}
                variables={{
                  text: this.state.value,
                  messageId: this.props.messageId
                }}
              >Create Comment</CreateOptions>
            </div>
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
