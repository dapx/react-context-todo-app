import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import ListItem, { CheckBox, Text, RemoveButton } from '../ListItem';

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

  describe('should checkbox and text be', () => {
    it('unchecked', () => {
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
      const text = wrapper.find(Text);

      const isCheckBoxChecked = checkbox.prop('checked');
      const isTextChecked = text.prop('checked');

      expect(isCheckBoxChecked).toBe(false);
      expect(isTextChecked).toBe(false);
      expect(isCheckBoxChecked).toBe(isTextChecked);
    });

    it('unchecked and empty', () => {
      const tree = renderer
        .create(
          <ListItem
            id={'some-id'}
            text={''}
            onClose={() => {}}
            onRemove={() => {}}
            checked={false}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('unchecked and not empty', () => {
      const tree = renderer
        .create(
          <ListItem
            id={'some-id'}
            text={'some text'}
            onClose={() => {}}
            onRemove={() => {}}
            checked={false}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('checked', () => {
      const handleClose = jest.fn();
      const handleRemove = jest.fn();
      const wrapper = mount(
        <ListItem
          id={'some-id'}
          text={'some text'}
          onClose={handleClose}
          onRemove={handleRemove}
          checked={true}
        />
      );
      const checkbox = wrapper.find(CheckBox);
      const text = wrapper.find(Text);

      const isCheckBoxChecked = checkbox.prop('checked');
      const isTextChecked = text.prop('checked');

      expect(isCheckBoxChecked).toBe(true);
      expect(isTextChecked).toBe(true);
      expect(isCheckBoxChecked).toBe(isTextChecked);
    });

    it('checked and empty', () => {
      const tree = renderer
        .create(
          <ListItem
            id={'some-id'}
            text={''}
            onClose={() => {}}
            onRemove={() => {}}
            checked={true}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('checked and not empty', () => {
      const tree = renderer
        .create(
          <ListItem
            id={'some-id'}
            text={'some text'}
            onClose={() => {}}
            onRemove={() => {}}
            checked={true}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
