import React, { Component } from 'react';
import './App.css';
import MessageList from './Messages/MessageList.js';
import MessageContainer from './Messages/MessageContainer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CreateMessage from './Messages/CreateMessage.js';
import { doCreateMessage } from './actionCreator.js';
import uuid from 'uuid/v4';


function mapStateToPropsMessage(state, props) {
  const { router: { match: { params: { id: id } } } } = props;
  const message = state.messageState.messages[id];
  const user = state.messageState.users[message.user];
  return {
    user,
    message,
  };
}

function mapStateToPropsMessageList(state, props) {
  const messageIds = state.messageState.messageIds;
  return {
    messageIds,
  };
}

function mapDispatchToPropsCreateMessage(dispatch, props) {
  return {
    createMessage: (text) => {
      dispatch(doCreateMessage(text, uuid(), 1));
    },
  }
}

const ConnectedCreateMessage = connect(null, mapDispatchToPropsCreateMessage)(CreateMessage)
const ConnectedMessageList = connect(mapStateToPropsMessageList)(MessageList);
const ConnectedMessage = connect(mapStateToPropsMessage)(MessageContainer);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render () {
    const { likes, messageIds, comments } = this.state;
    return (
      <div className="App">
      <Router>
        <Route exact path="/" component={() =>
          <div>
            <ConnectedCreateMessage />
            <ConnectedMessageList />
          </div>}
        />
        <Route path="/view/:id" component={(router) =>
          <ConnectedMessage router={router} />}
        />
      </Router>
      </div>
    );
  }
}

export default App;
