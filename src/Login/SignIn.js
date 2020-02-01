import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';
import { doUpdateToken } from '../actionCreator.js';
import { connect } from 'react-redux';


const SIGN_IN = gql`
  mutation($login: String!, $password: String!) {
    signIn(login: $login, password: $password)
    {
      token
    }
  }
`;


const mapDispatchToProps = (dispatch, props) => {
  return {
    history: props.router.history,
    updateCurrentUser: (client, mutationResult) => {
      const token = mutationResult.data.signIn.token;
      dispatch(doUpdateToken(token));
      localStorage.setItem('token', token);
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
              onCompleted={() => this.props.history.push('/')}
            >
              {(signIn, { data, loading, error }) => {
                  return (
                    <button type="button" onClick={signIn}>Sign In</button>
                  );
              }}
            </Mutation>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(SignIn);
