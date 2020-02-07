import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withTokenRefresh } from '../Common/Button/withTokenRefresh.js';
import Button from '../Common/Button/Button.js';

const CREATE_MESSAGE = gql`
  mutation($text: String!) {
    createMessage(text: $text) {
      id
      text
      user {
        id
        username
      }
    }
  }
`;

const ButtonWithRefresh = withTokenRefresh(Button);

export default ({ updateMessages, onComplete, text, onError }) =>
  <div className="createOptions">
    <div className="createFormatting">
      <span>Formatting Options Belong Here</span>
    </div>
    <div className="createButton">
      <Mutation mutation={CREATE_MESSAGE}
        variables={{ text, }}
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
                router={this.props.router}
              >
              Create Message
              </ButtonWithRefresh>
            </div>
          );
        }}
      </Mutation>
    </div>
  </div>
