import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import ListItem, { CheckBox, RemoveButton } from '../ListItem';

describe('ListItem Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ListItem
        id={'some-id'}
        text={'some-text'}
        onRemove={() => {}}
        onClose={() => {}}
        checked={false}
      />,
      div
    );
  });

  describe('should calls the function', () => {
    it('onClose when clicking on the checkbox', () => {
      const handleClose = jest.fn();
      const handleRemove = jest.fn();
      const wrapper = mount(
        <ListItem
          id={'some-id'}
          text={'some text'}
          onClose={handleClose}
          onRemove={handleRemove}
          checked={false}
        />
      );
      const checkbox = wrapper.find(CheckBox);
      checkbox.simulate('click');
      expect(handleClose.mock.calls.length).toEqual(1);
      expect(handleRemove.mock.calls.length).toEqual(0);
    });

    it('onRemove when clicking on the removeButton', () => {
      const handleClose = jest.fn();
      const handleRemove = jest.fn();
      const wrapper = mount(
        <ListItem
          id={'some-id'}
          text={'some text'}
          onClose={handleClose}
          onRemove={handleRemove}
          checked={false}
        />
      );
      const removeButton = wrapper.find(RemoveButton);
      removeButton.simulate('click');
      expect(handleClose.mock.calls.length).toEqual(0);
      expect(handleRemove.mock.calls.length).toEqual(1);
    });
  });
});
