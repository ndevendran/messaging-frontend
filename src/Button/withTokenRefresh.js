import React from 'react';
import { Redirect } from 'react-router-dom';

export const withTokenRefresh = (Component) => (props) => {
  const token_expiration = localStorage.getItem('token_expiration');
  const date = new Date(token_expiration);
  const start = date.getTime();
  const now = Date.now();
  if (now-start >= 0) {

    //token expired
    localStorage.setItem('token', '');
    return (
      <Redirect to="/login" />
    )
  }

  return (
    <Component { ...props } />
  );
}

export const withTokenClear = (Component) => (props) => {
  const token_expiration = localStorage.getItem('token_expiration');
  const date = new Date(token_expiration);
  const start = date.getTime();
  const now = Date.now();
  if (now-start >= 0) {

    //token expired
    localStorage.removeItem('token');
  }

  return (
    <Component {...props} />
  )
}
