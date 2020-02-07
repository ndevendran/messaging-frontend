import React from 'react';

export default function({ error }) {
  return (
    <div className="error">
      <span>{ error }</span>
    </div>
  )
}
