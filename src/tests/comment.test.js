import React from 'react';
import CommentList from '../Comments/CommentList';
import CommentItem from '../Comments/CommentItem';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

Enzyme.configure({adapter: new Adapter()});


describe('Comments', () => {
  const comments = [
    {
      id: 1,
      text: 'Test comment 1',
      user: {
        username: 'lilniro',
      },
    },
    {
      id: 2,
      text: 'Test comment 2',
      user: {
        username: 'wendy666',
      },
    },
  ];

  describe('CommentList', () => {
      it('loads without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<CommentList comments={comments} />, div);
        ReactDOM.unmountComponentAtNode(div);
      });

      it('has a valid snapshot', () => {
        const component = renderer.create(<CommentList comments={comments} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('has the correct number of comments', () => {
        const element = shallow(<CommentList comments={comments} />);

        expect(element.find(CommentItem).length).toBe(2);
      });
  });

  describe('CommentItem', () => {
    it('loads without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<CommentItem comment={comments[1]} />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('has a valid snapshot', () => {
      const div = document.createElement('div');
      const component = renderer.create(<CommentItem comment={comments[1]} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has a header, body, and footer all under a comment class', () => {
      const element = shallow(<CommentItem comment={comments[0]} />);
      expect(element.find('.comment').length).toBe(1);
      expect(element.find('.header').length).toBe(1);
      expect(element.find('.body').length).toBe(1);
      expect(element.find('.footer').length).toBe(1);
    });
  });
});
