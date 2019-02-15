import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import InputText from '../InputText';

it('renders without crashing', () => {
  const input = document.createElement('input');
  ReactDOM.render(<InputText />, input);
});

it('Should render input text empty when component is mounted', () => {
  const wrapper = shallow(<InputText onSubmit={() => {}} />);
  expect(wrapper).toHaveState('text');
  expect(wrapper.state('text')).toEqual('');
});

it('Should submit text when pressed the enter key', () => {
  const handleSubmit = jest.fn();
  const wrapper = mount(<InputText onSubmit={handleSubmit} />);
  const input = wrapper.find('input');

  input.simulate('keydown', { key: 'Enter' });
  expect(handleSubmit).toBeCalledWith('');

  input.simulate('change', { target: { value: 'some value' } });
  input.simulate('keydown', { key: 'Enter' });
  expect(handleSubmit).toBeCalledWith('some value');
});

it('Should clear text input when pressed enter key', () => {
  const handleSubmit = jest.fn();
  const wrapper = mount(<InputText onSubmit={handleSubmit} />);
  const input = wrapper.find('input');

  input.simulate('change', { target: { value: 'some value' } });
  expect(wrapper.state('text')).toEqual('some value');

  input.simulate('keydown', { key: 'Enter' });
  expect(handleSubmit).toBeCalledWith('some value');

  expect(wrapper.state('text')).toEqual('');
  input.simulate('keydown', { key: 'Enter' });
  expect(handleSubmit).toBeCalledWith('');
});

it('should be the same as the snapshot', () => {
  const tree = renderer.create(<InputText />).toJSON();
  expect(tree).toMatchSnapshot();
});
