import React, { Component } from 'react';
import './App.css';
import MessageList from './Messages/MessageList.js';
import MessageContainer from './Messages/MessageContainer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateMessage from './Messages/CreateMessage.js';
import Profile from './Profile';
import Navigation from './Navigation';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render () {
    return (
      <div className="App">
      <Router>
        <Navigation />
        <div className="App-main">
          <Route exact path="/" component={() =>
            <div className="App-content_large-header">
              <h1>Messages</h1>
              <CreateMessage />
              <MessageList />
            </div>}
          />
          <Route path="/view/:id" component={(router) =>
            <MessageContainer router={router} />}
          />
          <Route path="/profile" component={() =>
            <div className="App-content_small-header">
              <h1>Profile</h1>
              <Profile />
            </div>
          }/>
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
