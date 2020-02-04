import React from 'react';
import { connect } from 'react-redux';
import { doCreateMessage } from '../actionCreator.js';
import uuid from 'uuid/v4';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { withTokenRefresh } from '../Button/withTokenRefresh.js';
import Button from '../Button/Button.js';


const CREATE_MESSAGE = gql`
  mutation($text: String!) {
    createMessage(text: $text) {
      id
      text
      user {
        id
        username
      }
    }
  }
`;

const MESSAGES_QUERY = gql`
  query Messages {
    messages {
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

function updateMessages(client, mutationResult) {
  const messages = client.readQuery({
    query: MESSAGES_QUERY,
  });

  console.log(mutationResult);

  client.writeQuery({
    query: MESSAGES_QUERY,
    data:
      { messages:
        {
          ...messages.messages,
          edges: messages.messages.edges
          .concat(mutationResult.data.createMessage),
        }
      }
  });

  const message = {
      message: mutationResult.data.createMessage,
  };

  return message;
}

function mapStateToProps(state, props) {
  const currentUser = state.profileState.currentUser;
  const token = state.profileState.token;
  const history = props.router.history;
  return {
    history,
    currentUser,
    token,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    createMessage: (text, currentUser) => {
      dispatch(doCreateMessage(text, uuid(), currentUser.id));
    },
  }
}

class CreateMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('token'),
      value: '',
    };

    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.onCreateMessage = this.onCreateMessage.bind(this);
  }

  onChangeMessage(event) {
    const value = event.target.value;
    this.setState({
      value,
    });
  }

  onCreateMessage(client, mutationResult) {
    this.props.createMessage(this.state.value, this.props.currentUser);
    this.setState({
      value: '',
    });
  }

  render () {
    const ButtonWithRefresh = withTokenRefresh(Button);
    if(this.state.token) {
      return (
        <div>
            <input type="text" value={this.state.value}
              onChange={this.onChangeMessage}
            />
            <Mutation mutation={CREATE_MESSAGE}
              variables={{ text: this.state.value }}
              update={updateMessages}
              onCompleted={() => {
                this.props.history.push('/');
                this.setState({
                value: ''
              });
            }}
            >
              {(createMessage, { data, loading, error }) => {
                if(error) {
                  return (
                    <div>
                      <div>Error creating message</div>
                      <button type="submit" onClick={createMessage}>Create Message</button>
                    </div>
                  );
                }
                return (
                    <ButtonWithRefresh
                      type="button"
                      onClick={createMessage}
                      router={this.props.router}
                    >
                    Create Message
                    </ButtonWithRefresh>
                );
              }}
            </Mutation>
        </div>
      );
    } else {
      return (
        <div>
          Please Login To Create Messages...
        </div>
      )
    }

  }
}

export default connect(
  mapStateToProps, mapDispatchToProps)(CreateMessage);
