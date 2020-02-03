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
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { withTokenClear } from './Button/withTokenRefresh.js';

const GET_MESSAGE = gql`
  query( $id: ID! ){
    message(id: $id) {
      id
      text
      user {
        id
        username
      }
      likes {
        count
      }
      comments {
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
          <Route path="/view/:id" component={(router) =>
            <div>
              <Query
                query={GET_MESSAGE}
                variables={{ id: router.match.params.id }}
                notifyOnNetworkStatusChange
              >
              {({ data, error, loading, networkStatus }) => {
                if (error) console.log(error);
                if(loading || !data) {
                  return (<div>Loading...</div>);
                }

                const message = data.message;
                const MessageWithClear = withTokenClear(MessageContainer);
                return (
                  <MessageWithClear message={message} router={router} />
                );
              }}
              </Query>
              </div>
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
