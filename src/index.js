import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, combineReducers } from 'redux';
import { schema, normalize } from 'normalizr';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

const actionTypes = {
  LIKE_COMMENT: 'LIKE_COMMENT',
  LIKE_MESSAGE: 'LIKE_MESSAGE',
  CREATE_MESSAGE: 'CREATE_MESSAGE',
  CREATE_COMMENT: 'CREATE_COMMENT',
}

function likeMessage(id) {
  return {
    type: actionTypes.LIKE_MESSAGE,
    message: { id: id },
  };
}

function createMessage(text, id, user) {
  return {
    type: actionTypes.CREATE_MESSAGE,
    message: {id: id, text: text, user: user, commentIds: []}
  }
}

function createComment(text, id, messageId, user) {
  return {
    type: actionTypes.CREATE_COMMENT,
    comment: {id: id, text: text, user: user, messageId: messageId}
  }
}

function messageReducer(state = [], action) {
  switch(action.type) {
    case actionTypes.LIKE_MESSAGE: {
      const id = action.message.id;
      const newLikes = state.likes;
      newLikes[id].count++;
      const newState = { ...state, likes: { ...newLikes } };
      return newState;
    }
    case actionTypes.CREATE_MESSAGE: {
      const message = action.message;
      const messages = state.messages;
      const likes = state.likes;
      const messageIds = state.messageIds;
      likes[message.id] = { count: 0 };
      messages[message.id] = message;
      messageIds.push(message.id);
      const newState = { ...state, messages, likes, messageIds };
      return newState;
    }
    default: return state;
  }
}

function commentReducer(state, action) {
  switch(action.type) {
    case actionTypes.CREATE_COMMENT: {
      const comment = action.comment;
      const comments = state.comments;
      comments.push(comment);
      const newState = { ...state, comments };
      return newState;
    }
    default: return state;
  }
}


const userSchema = new schema.Entity('user');
const commentsSchema = new schema.Entity('comments', {
  user: userSchema,
});
const messageSchema = new schema.Entity('messages', {
  comments: [ commentsSchema ],
  user: userSchema,
});

const messages2 = [
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
  },
];

const normalizedData = normalize(messages2, [ messageSchema ]);
console.log(`Normalized Data: ${JSON.stringify(normalizedData)}`);

const messages = {
  1: {
    id: 1,
    user: {
      username: 'lilniro',
    },
    text: "Test message one!",
    commentIds: [1,2,3,4,5]
  },

  2: {
    id: 2,
    user: {
      username: 'wendy666',
    },
    text: "Test message two!",
    commentIds: [],
  },
};

const comments = {
  1: {
    id: 1,
    user: {
      username: 'lilniro',
    },
    text: "First comment!",
    messageId: 1
  },
  2: {
    id: 2,
    user: {
      username: 'chaterine',
    },
    text: "This is stupid!",
    messageId: 1
  },
  3: {
    id: 3,
    user: {
      username: 'marciacowley',
    },
    text: "Chaterine I couldn't get it working. I'm going home!",
    messageId: 1
  },
  4: {
    id: 4,
    user: {
      username: 'chaterine',
    },
    text: "Marcy I swear if you leave I'll have you evicted!",
    messageId: 1
  },
  5: {
    id: 5,
    user: {
      username: 'marciacowley',
    },
    text: "Too late! Already gone!",
    messageId: 1
  },
};

const likes = {
  1: {
    count: 10,
  },
  2: {
    count: 29,
  }
};

const users = {
  1: {
    username: "lilniro",
  },

  2: {
    username: "wendy666",
  },

  3: {
    username: "marciacowley",
  },

  4: {
    username: "chaterine",
  }
};

const messageIds = [1, 2];

const initialState = {
  likes,
  messages,
  comments,
  messageIds,
};

const store = createStore(messageReducer, initialState);

store.dispatch(createMessage("Using actions to create messages", 3, users[1]));
store.dispatch(likeMessage(3));

ReactDOM.render(
    <Provider store={store}>
    <App likes={likes} messages={messages}
      comments={comments}
      messageIds={messageIds} />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
