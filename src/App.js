import React, { Component } from 'react';
import './App.css';
import MessageList from './Messages/MessageList.js';
import MessageContainer from './Messages/MessageContainer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';


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
        <Route exact path="/" component={() => <ConnectedMessageList />}
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
