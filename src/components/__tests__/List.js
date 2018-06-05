import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import List from '../List';

describe('List Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<List list={[]} onClick={() => {}} />, div);
  });

  it('should be empty and hide clear completed button', () => {
    const tree = renderer.create(<List list={[]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render two todo items', () => {
    const list = [
      { id: 'some-id-1', text: 'todo 1', isDone: false },
      { id: 'some-id-2', text: 'todo 2', isDone: false }
    ];
    const tree = renderer.create(<List list={list} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render one todo item and one completed', () => {
    const list = [
      { id: 'some-id-1', text: 'todo 1', isDone: false },
      { id: 'some-id-2', text: 'todo 2', isDone: true }
    ];
    const tree = renderer.create(<List list={list} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render two completed todo items and hide clear completed button', () => {
    const list = [
      { id: 'some-id-1', text: 'todo 1', isDone: true },
      { id: 'some-id-2', text: 'todo 2', isDone: true }
    ];
    const tree = renderer.create(<List list={list} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
