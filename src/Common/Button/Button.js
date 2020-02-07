import React from 'react';
import './button.css';

export default function Button({
  onClick,
  type,
  children
}) {
  return (
    <button className="button_std" type={type} onClick={onClick}>
      {children}
    </button>
  )
}
