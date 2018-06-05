import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import List from '../List';

describe('List Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<List list={[]} onClick={() => {}} />, div);
  });

  it('should filter all todo items', () => {
    const list = [
      { id: 'some-id-1', text: 'todo 1', isDone: false },
      { id: 'some-id-2', text: 'todo 2', isDone: true },
      { id: 'some-id-3', text: 'todo 3', isDone: false }
    ];
    const wrapper = mount(<List list={list} />);
    expect(wrapper.state('list').length).toBe(3);

    const completedFilter = wrapper.find('[href="#"]').find('a');
    expect(completedFilter).toExist();

    completedFilter.simulate('click');
    expect(wrapper.state('list').length).toBe(3);
  });

  it('should filter completed todo items', () => {
    const list = [
      { id: 'some-id-1', text: 'todo 1', isDone: false },
      { id: 'some-id-2', text: 'todo 2', isDone: true },
      { id: 'some-id-3', text: 'todo 3', isDone: false }
    ];
    const wrapper = mount(<List list={list} />);
    expect(wrapper.state('list').length).toBe(3);

    const completedFilter = wrapper.find('[href="#/completed"]').find('a');
    expect(completedFilter).toExist();

    completedFilter.simulate('click');
    expect(wrapper.state('list').length).toBe(1);
  });

  it('should filter active todo items', () => {
    const list = [
      { id: 'some-id-1', text: 'todo 1', isDone: false },
      { id: 'some-id-2', text: 'todo 2', isDone: true },
      { id: 'some-id-3', text: 'todo 3', isDone: false }
    ];
    const wrapper = mount(<List list={list} />);
    expect(wrapper.state('list').length).toBe(3);

    const completedFilter = wrapper.find('[href="#/active"]').find('a');
    expect(completedFilter).toExist();

    completedFilter.simulate('click');
    expect(wrapper.state('list').length).toBe(2);
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
