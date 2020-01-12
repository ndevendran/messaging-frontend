import React from 'react';

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
    this.props.createMessage(this.state.value);
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

export default CreateMessage;
