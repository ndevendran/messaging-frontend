export const actionTypes = {
  LIKE_COMMENT: 'LIKE_COMMENT',
  LIKE_MESSAGE: 'LIKE_MESSAGE',
  CREATE_MESSAGE: 'CREATE_MESSAGE',
  CREATE_COMMENT: 'CREATE_COMMENT',
  ADD_COMMENT: 'ADD_COMMENT',
}

export function doCreateComment(text, id, messageId, userId) {
  return {
    type: actionTypes.CREATE_COMMENT,
    comment: {id: id, text: text, user: userId, messageId: messageId }
  }
}

export function doLikeMessage(id) {
  return {
    type: actionTypes.LIKE_MESSAGE,
    message: { id: id },
  };
}

export function doCreateMessage(text, id, userId) {
  return {
    type: actionTypes.CREATE_MESSAGE,
    message: {id: id, text: text, user: userId }
  }
}

export function doAddCommentToMessage(commentId, messageId) {
  return {
    type: actionTypes.ADD_COMMENT,
    commentId: commentId,
    messageId: messageId,
  }
}
