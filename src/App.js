import React from 'react';
import logo from './logo.svg';
import './App.css';
import MessageList from './Messages/MessageList.js';
import Message from './Messages/Message.js';
import MessageContainer from './Messages/MessageContainer';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

const messages = [
  {
    id: 1,
    user: {
      username: 'lilniro',
    },
    text: "Test message one!",
  },

  {
    id: 2,
    user: {
      username: 'wendy666',
    },
    text: "Test message two!",
  },
];

const comments = [
  {
    id: 1,
    user: {
      username: 'lilniro',
    },
    text: "First comment!",
    messageId: 1
  },
  {
    id: 2,
    user: {
      username: 'chaterine',
    },
    text: "This is stupid!",
    messageId: 1
  },
  {
    id: 3,
    user: {
      username: 'marciacowley',
    },
    text: "Chaterine I couldn't get it working. I'm going home!",
    messageId: 1
  },
  {
    id: 4,
    user: {
      username: 'chaterine',
    },
    text: "Marcy I swear if you leave I'll have you evicted!",
    messageId: 1
  },
  {
    id: 5,
    user: {
      username: 'marciacowley',
    },
    text: "Too late! Already gone!",
    messageId: 1
  },
];

function App() {
  return (
    <div className="App">
    <Router>
      <Route exact path="/" component={() => <MessageList messages={messages} />} />
      <Route path="/view/:id" component={(router) =>
        <MessageContainer messages={messages} comments={comments} router={router}/>}
      />
    </Router>
    </div>
  );
}

export default App;
