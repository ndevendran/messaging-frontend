import React, { Component } from 'react';
import './App.css';
import MessageList from './Messages/MessageList.js';
import MessageContainer from './Messages/MessageContainer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';


function mapStateToPropsMessage(state, props) {
  const { router: { match: { params: { id: id } } } } = props;
  const comments = state.comments.filter(comment => comment.messageId === id);
  const message = state.messages[id];
  return {
    comments,
    message,
  };
}

const ConnectedMessage = connect(mapStateToPropsMessage)(MessageContainer);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.likes,
      comments: this.props.comments,
      messages: this.props.messages,
      messageIds: this.props.messageIds,
    }
  }

  likeMessage = (messageId) => {
    this.setState((prevState) => {
      const message = this.state.likes[messageId];
      message.count++;
      return {
        ...prevState,
        message,
      };
    });
  };

  render () {
    const { likes, messageIds, comments } = this.state;
    return (
      <div className="App">
      <Router>
        <Route exact path="/" component={() => <MessageList messageIds={messageIds}
          likes={likes} likeMessage={this.likeMessage}
          comments={comments}/>}
        />
        <Route path="/view/:id" component={(router) =>
          <ConnectedMessage router={router}/>}
        />
      </Router>
      </div>
    );
  }
}

export default App;
