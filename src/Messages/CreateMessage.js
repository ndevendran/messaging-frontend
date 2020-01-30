import React from 'react';
import { connect } from 'react-redux';
import { doCreateMessage } from '../actionCreator.js';
import uuid from 'uuid/v4';


function mapStateToProps(state, props) {
  const currentUser = state.profileState.currentUser;
  return {
    currentUser,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    createMessage: (text, currentUser) => {
      dispatch(doCreateMessage(text, uuid(), currentUser.id));
    },
  }
}

class CreateMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.onCreateMessage = this.onCreateMessage.bind(this);
  }

  onChangeMessage(event) {
    const value = event.target.value;
    this.setState({
      value,
    });
  }

  onCreateMessage(event) {
    this.props.createMessage(this.state.value, this.props.currentUser);
    this.setState({
      value: '',
    });
    event.preventDefault();
  }

  render () {
    return (
      <div>
        <form onSubmit={this.onCreateMessage}>
          <input type="text" value={this.state.value}
            onChange={this.onChangeMessage}
          />
          <button type="submit">Create Message</button>
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps)(CreateMessage);
