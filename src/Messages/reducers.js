import { actionTypes } from '../actionCreator.js';

function applyLikeMessage(state, action) {
  const id = action.message.id;
  const newLikes = state.likes;
  newLikes[id].count++;
  const newState = { ...state, likes: { ...newLikes } };
  return newState;
}

function applyCreateMessage(state, action) {
  const message = { ...action.message, likes: 0, comments: []};
  const messages = { ...state.messages, [message.id]: message };
  const likes = { ...state.likes, [message.id]: { count: 0 } };
  const messageIds = [ ...state.messageIds, message.id ];
  const newState = { ...state, messages, likes, messageIds };
  return newState;
}

function applyAddComment(state, action) {
  const comments = [ ...state.messages[action.messageId].comments, action.commentId ];
  const message = { ...state.messages[action.messageId], comments: comments };
  const messages = { ...state.messages, [action.messageId]: message };
  return { ...state, messages, };
}

export default function messageReducer(state = [], action) {
  switch(action.type) {
    case actionTypes.LIKE_MESSAGE: {
      return applyLikeMessage(state, action);
    }
    case actionTypes.CREATE_MESSAGE: {
      return applyCreateMessage(state, action);
    }
    case actionTypes.ADD_COMMENT: {
      return applyAddComment(state, action);
    }
    default: return state;
  }
}
