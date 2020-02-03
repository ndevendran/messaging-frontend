import React from 'react';
import { connect } from 'react-redux';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const CREATE_MESSAGE = gql`
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

class CreateComment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
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
    this.props.createComment(this.state.value, this.props.messageId, this.props.currentUser);
    this.setState({
      value: '',
    });
  }

  render() {
    if(this.props.token) {
      return (
        <div>
            <input type="text"
              value={this.state.value}
              onChange={this.onChangeComment}
            />
            <Mutation mutation={CREATE_MESSAGE}
              variables={{
                text: this.state.value,
                messageId: this.props.messageId,
              }}
              update={this.onCreateComment}
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

function mapStateToProps(state, props) {
  const currentUser = state.profileState.currentUser;
  const token = localStorage.getItem('token');
  return {
    token,
    currentUser,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    createComment: (text, messageId) => {
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)
  (CreateComment);
