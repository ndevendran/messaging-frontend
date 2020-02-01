import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { schema, normalize } from 'normalizr';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { doLikeMessage, doCreateMessage,
  createCommentAndAddToMessage } from './actionCreator.js'
import messageReducer from './Messages/reducers.js';
import commentReducer from './Comments/reducers.js';
import profileReducer from './Profile/reducers.js';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';

const MESSAGING_BASE_URL = 'http://localhost:8000/graphql';

const httpLink = new HttpLink({
  uri: MESSAGING_BASE_URL,
});


const errorLink = onError(({
  graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      //do something
    }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      'x-token': token ? token : "",
    }
  }
});

const link = ApolloLink.from([errorLink, authLink, httpLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});



const likesSchema = new schema.Entity('likes');
const userSchema = new schema.Entity('user');
const commentsSchema = new schema.Entity('comments', {
  user: userSchema,
});
const messageSchema = new schema.Entity('messages', {
  comments: [ commentsSchema ],
  user: userSchema,
  likes: likesSchema,
});

const messagesRawData = [
  {
    id: 1,
    user: {
      id: 1,
      username: 'lilniro',
    },
    text: "Test message one!",
    comments: [
        {
          id: 1,
          user: {
            id: 1,
            username: 'lilniro',
          },
          text: "First comment!",
          messageId: 1
        },
        {
          id: 2,
          user: {
            id: 2,
            username: 'chaterine',
          },
          text: "This is stupid!",
          messageId: 1
        }
    ],
    likes: {
      id: 1,
      count: 10,
    }
  },
];

const normalizedData = normalize(messagesRawData, [ messageSchema ]);

const messages = normalizedData.entities.messages;

const comments = normalizedData.entities.comments;

const likes = normalizedData.entities.likes;

const users = normalizedData.entities.user;

const messageIds = normalizedData.result;

const currentUser = users[2];

console.log(normalizedData);

const initialState = {
  messageState: {
    messages,
    likes,
    messageIds,
    users,
  },
  commentState: {
    comments,
    users,
  },
  profileState: {
    currentUser,
  },
};

const rootReducer = combineReducers({
  messageState: messageReducer,
  commentState: commentReducer,
  profileState: profileReducer,
});



const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

store.dispatch(doCreateMessage("Using actions to create messages", 3, 1));
store.dispatch(createCommentAndAddToMessage("Using actions to comment", 3, 3, 2));
store.dispatch(doLikeMessage(3));

ReactDOM.render(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App messageIds={messageIds} />
      </Provider>
    </ApolloProvider>,
    document.getElementById('root')
);
