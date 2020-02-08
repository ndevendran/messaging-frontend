import React from 'react';
import CreateOptions from '../Common/CreateOptions.js';
import '../Messages/messageStyle.css';


class CreateResponse extends React.Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem('token');

    this.state = {
      token,
      error: null,
    };
  }

  render() {
    return (
      <div className="create">
        <div className="avatar"></div>
        <div>
          <textarea className="textInput"
            rows="4" cols="50"
            value={this.props.value}
            onChange={this.props.onChange}
          ></textarea>
            <CreateOptions
              mutation={this.props.mutation}
              update={this.props.update}
              onComplete={this.props.onComplete}
              onError={this.props.onError}
              variables={this.props.variables}
              router={this.props.router}
            > {this.props.children}
            </CreateOptions>
        </div>
      </div>
    );
  }
}

export default CreateResponse;
