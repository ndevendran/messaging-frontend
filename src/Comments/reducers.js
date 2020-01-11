import { actionTypes } from '../actionCreator.js';

function applyCreateComment(state, action) {
  const comment = { ...action.comment, likes: 0 };
  const comments = { ...state.comments, [action.comment.id]: comment };
  return { ...state, comments  };
}

export default function commentReducer(state = [], action) {
  switch(action.type) {
    case actionTypes.CREATE_COMMENT: {
      return applyCreateComment(state, action);
    }
    default: return state;
  }
}
