import React from 'react';
import { Redirect } from 'react-router-dom';

export function Logout(props) {
  localStorage.removeItem('token');
  return(
    <Redirect to="/login" />
  );
}
