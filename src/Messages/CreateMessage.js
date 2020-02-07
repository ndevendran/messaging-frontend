import React from 'react';
import { connect } from 'react-redux';
import { doCreateMessage } from '../actionCreator.js';
import uuid from 'uuid/v4';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { withTokenRefresh } from '../Common/Button/withTokenRefresh.js';
import Button from '../Common/Button/Button.js';
import './messageStyle.css';
import Error from '../Common/Error.js';
import CreateOptions from '../Common/CreateOptions.js';


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
      error: '',
    };

    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.onCreateMessage = this.onCreateMessage.bind(this);
    this.onCompleted = this.onCompleted.bind(this);
    this.updateMessages = this.updateMessages.bind(this);
  }

  updateMessages(client, mutationResult) {
    const messages = client.readQuery({
      query: MESSAGES_QUERY,
    });

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

  onError(err) {
    this.setState({
      error: err.message,
    });
  }

  onCompleted() {
    this.props.history.push('/');
    this.setState({
      value: ''
    });
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
    const prevError = this.state.error;
    if(this.state.token) {
      return (
        <div>
          <div className="create">
              <div className="avatar">Avatar Belongs Here</div>
              <div>
                <textarea className="textInput"
                  rows="4" cols="50"
                  value={this.state.value}
                  onChange={this.onChangeMessage}
                ></textarea>
                <div className="createOptions">
                  <div className="createFormatting">
                    <span>Formatting Options Belong Here</span>
                  </div>
                  <div className="createButton">
                    <Mutation mutation={CREATE_MESSAGE}
                      variables={{ text: this.state.value }}
                      update={this.updateMessages}
                      onCompleted={() => {
                        this.props.history.push('/');
                        this.setState({
                        value: ''
                      });
                    }}
                    >
                      {(createMessage, { data, loading, error }) => {
                        return (
                          <div>
                            <ButtonWithRefresh
                              type="button"
                              onClick={() => createMessage().catch(err => {
                                this.setState({
                                  error: err.message,
                                });
                              })}
                              router={this.props.router}
                            >
                            Create Message
                            </ButtonWithRefresh>
                          </div>
                        );
                      }}
                    </Mutation>
                  </div>
                </div>
              </div>
          </div>
          <div>
          {
            prevError && <Error error={prevError} />
          }
          </div>
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
