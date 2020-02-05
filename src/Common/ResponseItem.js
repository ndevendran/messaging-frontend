import React from 'react';
import './index.css';
import { MONTHS } from '../constants/dateConstants';

const ResponseItem =  ({ response,
    responseId, user, likeResponse, commentCount }) => {
  const createdAt = new Date(response.createdAt);
  const now = new Date();
  const month = createdAt.getMonth();
  const date = createdAt.getDate();
  if(date === now.getDate()) {
    //get hours passed here
  }

  return (
    <div className="response-container">
    <div className="avatar"></div>
      <div className="response">
        <div className="header">
        <small></small>
        <small className="username">{response.user.username}</small>
        <small className="date">{MONTHS[month+1]} {date}</small>
        </div>
        <div className="body">
          {response.text}
        </div>
      </div>
    </div>
  );
};

export default ResponseItem;
