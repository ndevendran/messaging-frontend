import React from 'react';
import { createCommentAndAddToMessage } from '../actionCreator.js';
import uuid from 'uuid/v4';
import { connect } from 'react-redux';

class CreateComment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.onChangeComment = this.onChangeComment.bind(this);
    this.onSubmitComment = this.onSubmitComment.bind(this);
  }

  onChangeComment(event) {
    const value = event.target.value;
    this.setState(
      {
        value,
      }
    );
  }

  onSubmitComment(event) {
    this.props.createComment(this.state.value, this.props.messageId);
    this.setState({
      value: '',
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitComment}>
          <input type="text"
            value={this.state.value}
            onChange={this.onChangeComment}
          />
          <button type="submit">Create Comment</button>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    createComment: (text, messageId) => {
      dispatch(createCommentAndAddToMessage(text, uuid(), messageId, 1));
    }
  }
}

export default connect(null, mapDispatchToProps)
  (CreateComment);
