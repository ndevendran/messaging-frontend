import React from 'react';
import { connect } from 'react-redux';
import { doCreateMessage } from '../actionCreator.js';
import uuid from 'uuid/v4';
import gql from 'graphql-tag';
import Error from '../Common/Error.js';
import CreateResponse from '../Common/CreateResponse.js';

var _isMounted = false;

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
    this.onError = this.onError.bind(this);
    this.onErrorClear = this.onErrorClear.bind(this);
  }

  componentDidMount() {
    _isMounted = true;
  }

  componentWillUnmount() {
    _isMounted = false;
  }


  onErrorClear() {
    if(_isMounted) {
      this.setState({
        error: null,
      });
    }
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
    if(_isMounted) {
      this.setState({
        error: err.message,
      });
    }
  }

  onCompleted() {
    if(_isMounted) {
      this.props.history.push('/');
      this.setState({
        value: ''
      });
    }
  }

  onChangeMessage(event) {
    if(_isMounted) {
      const value = event.target.value;
      this.setState({
        value,
      });
    }
  }

  onCreateMessage(client, mutationResult) {
    if(_isMounted) {
      this.props.createMessage(this.state.value, this.props.currentUser);
      this.setState({
        value: '',
      });
    }
  }

  render () {
    const prevError = this.state.error;
    if(this.state.token) {
      return (
        <div>
          <CreateResponse
            mutation={CREATE_MESSAGE}
            update={this.updateMessages}
            onComplete={this.onCompleted}
            onChange={this.onChangeMessage}
            onError={this.onError}
            variables={{ text: this.state.value }}
            router={this.props.router}
            value={this.state.value}
          > Create Message
          </CreateResponse>
        <div>
          {
            prevError && <Error
              error={prevError}
              onErrorClear={this.onErrorClear}
             />
          }
          </div>
        </div>
      );
    } else {
      return (
        <div>
          Please Login To Create Messages...
        </div>
      );
    }
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps)(CreateMessage);
