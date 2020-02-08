import React from 'react';
import './error.css';

export default function({ error, onErrorClear }) {
  return (
    <div className="error" onClick={onErrorClear}>
      <span>{ error }</span>
    </div>
  )
}
