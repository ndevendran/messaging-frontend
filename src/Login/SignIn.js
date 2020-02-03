import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { doUpdateToken } from '../actionCreator.js';
import { connect } from 'react-redux';


const SIGN_IN = gql`
  mutation($login: String!, $password: String!) {
    signIn(login: $login, password: $password)
    {
      token
      expiresAt
    }
  }
`;


const mapDispatchToProps = (dispatch, props) => {
  return {
    history: props.router.history,
    updateCurrentUser: (client, mutationResult) => {
      const token = mutationResult.data.signIn.token;
      const expiration = mutationResult.data.signIn.expiresAt;
      dispatch(doUpdateToken(token));
      localStorage.setItem('token', token);
      localStorage.setItem('token_expiration', expiration);
    },
  };
}


class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
    };

    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeLogin = this.onChangeLogin.bind(this);
  }

  onChangePassword(event) {
    const password = event.target.value;
    this.setState({
      password,
    });
  }

  onChangeLogin(event) {
    const login = event.target.value;
    this.setState({
      login,
    });
  }

  render() {
    const { login, password } = this.state;
    const { updateCurrentUser } = this.props;
    return (
      <div>
          Username:<input
            value={login}
            onChange={this.onChangeLogin}
            type="text"></input>
          Password:<input
            value={password}
            onChange={this.onChangePassword}
            type="password"></input>
            <Mutation mutation={SIGN_IN}
              variables={{ login, password }}
              update={updateCurrentUser}
              onCompleted={() => this.props.history.push('/')}
            >
              {(signIn, { data, loading, error }) => {
                if(error) {
                  console.log(`The data: ${data}`);
                  console.log(`The loading: ${loading}`);
                  console.log(`The erro: ${error}`);
                }

                return (
                  <button type="button" onClick={() =>
                    {
                      localStorage.setItem('token', '');
                      signIn();
                    }}>
                    Sign In
                  </button>
                );
              }
              }
            </Mutation>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(SignIn);
