import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MessageList from '../Messages/MessageList.js';
import MessageItem from '../Messages/MessageItem.js';


Enzyme.configure({adapter: new Adapter()});

describe('Message', () => {
  const messages = [
    {
      id: 1,
      user: {
        username: 'testuser1',
      },
      text: 'test message one',
    },
    {
      id: 2,
      user: {
        username: 'testuser2',
      },
      text: 'test message two',
    },
  ];
  describe('Message List', () => {
    it('has a valid snapshot', () => {
      const component = renderer.create(
        <MessageList messages={messages} />
      );

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<MessageList messages={messages} />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('renders all messages in the list', () => {
      const element = shallow(
        <MessageList messages={messages} />
      );

      expect(element.find(MessageItem).length).toBe(2);
    });
  });

  describe('Message Item', () => {
    it('has a valid snapshot', () => {
      const component = renderer.create(
        <MessageItem message={messages[0]} />
      );

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('contains header, footer, and body all under a message class', () => {
      const element = shallow(
        <MessageItem message={messages[1]} />
      );
      expect(element.find('.message').length).toBe(1);
      expect(element.find('.footer').length).toBe(1);
      expect(element.find('.header').length).toBe(1);
      expect(element.find('.body').length).toBe(1);
    });

  });

  describe('Message Footer', () => {
    it('renders without crashing', () => {
      
    });
  });
});
