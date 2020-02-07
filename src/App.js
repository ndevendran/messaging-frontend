import React, { Component } from 'react';
import './App.css';
import MessageList from './Messages/MessageList.js';
import MessageContainer from './Messages/MessageContainer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateMessage from './Messages/CreateMessage.js';
import Profile from './Profile';
import Navigation from './Navigation';
import SignIn from './Login/SignIn.js';
import { Logout } from './Login/Logout.js';
import { withTokenClear } from './Common/Button/withTokenRefresh.js';




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
          <Route exact path="/" component={(router) => {
            const ListWithClear = withTokenClear(MessageList);
            return (
              <div className="App-content_large-header">
                <h1>Messages</h1>
                <CreateMessage router={router} />
                <ListWithClear router={router} />
              </div>
            );
          }}/>
          <Route path="/login" component={(router) => {
            const token = localStorage.getItem('token');
            if(token) {
              return (
                <div className="App-content_small-header">
                <Logout />
                </div>
              );
            } else {
              return (
                <div className="App-content_small-header">
                  <h1>Sign In</h1>
                  <SignIn router={router} />
                </div>
              );
            }
          }

          }
          />
          <Route path="/view/:id" component={(router) => {
                const MessageWithClear = withTokenClear(MessageContainer);
                return (
                  <div className="App-content_large-header">
                    <MessageWithClear router={router} />
                  </div>
                );
              }
            }
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
