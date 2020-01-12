import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { schema, normalize } from 'normalizr';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';
import { actionTypes, doLikeMessage, doCreateMessage,
  doAddCommentToMessage, doCreateComment,
createCommentAndAddToMessage } from './actionCreator.js'
import messageReducer from './Messages/reducers.js';
import commentReducer from './Comments/reducers.js';

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
  }
};

const rootReducer = combineReducers({
  messageState: messageReducer,
  commentState: commentReducer,
});



const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

store.dispatch(doCreateMessage("Using actions to create messages", 3, 1));
store.dispatch(createCommentAndAddToMessage("Using actions to comment", 3, 3, 2));
store.dispatch(doLikeMessage(3));

ReactDOM.render(
    <Provider store={store}>
    <App messageIds={messageIds} />
    </Provider>,
    document.getElementById('root')
);
