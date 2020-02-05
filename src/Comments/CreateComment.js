import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import '../Messages/messageStyle.css';
import Button from '../Button/Button.js';

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
        <div className="create">
            <div className="avatar">Avatar belongs here</div>
            <div>
              <textarea className="textInput" rows="4" columns="40"
                value={this.state.value}
                onChange={this.onChangeComment}
              ></textarea>
              <div className="createOptions">
                <div className="createFormatting">
                  <span>Formatting</span>
                </div>
                <div className="createButton">
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
                        <Button
                          type="button"
                          onClick={createComment}
                          router={this.props.router}
                        >
                        Create Comment
                        </Button>
                      );
                    }}
                  </Mutation>
                </div>
              </div>
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
