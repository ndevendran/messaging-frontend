import React from 'react';
import { Mutation } from 'react-apollo';
import { withTokenRefresh } from '../Common/Button/withTokenRefresh.js';
import Button from '../Common/Button/Button.js';
import '../Messages/messageStyle.css';

const ButtonWithRefresh = withTokenRefresh(Button);

export default ({ updateMessages,
  onComplete, variables, onError,
  router, mutation, children }) =>
{
  return (
  <div className="createOptions">
    <div className="createFormatting">
      <span>Formatting Options Belong Here</span>
    </div>
    <div className="createButton">
      <Mutation mutation={mutation}
        variables={variables}
        update={updateMessages}
        onCompleted={onComplete}
      >
        {(createMessage, { data, loading, error }) => {
          return (
            <div>
              <ButtonWithRefresh
                type="button"
                onClick={() => createMessage().catch(err => {
                  onError(err);
                })}
              >
              {children}
              </ButtonWithRefresh>
            </div>
          );
        }}
      </Mutation>
    </div>
  </div>
);
}
