import { actionTypes } from '../actionCreator.js';

function applyUseToken(state, action) {
  const token = action.token;
  const newState = { ...state, token };
  return newState;
}

const profileReducer = (state = [], action) => {
  switch(action.type){
    case actionTypes.USE_TOKEN: {
      return applyUseToken(state, action);
    }
    default: return state;
  }
}

export default profileReducer;
