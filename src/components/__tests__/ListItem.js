import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import ListItem, {
  CheckBox,
  Text,
  RemoveButton,
  InputText,
  Item
} from '../ListItem';

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
      const handleEdit = jest.fn();
      const wrapper = mount(
        <ListItem
          id={'some-id'}
          text={'some text'}
          onClose={handleClose}
          onRemove={handleRemove}
          onEdit={handleEdit}
          checked={false}
        />
      );
      const checkbox = wrapper.find(CheckBox);
      checkbox.simulate('click');
      expect(handleClose.mock.calls.length).toBe(1);
      expect(handleRemove.mock.calls.length).toBe(0);
      expect(handleEdit.mock.calls.length).toBe(0);
    });

    it('onRemove when clicking on the removeButton', () => {
      const handleClose = jest.fn();
      const handleRemove = jest.fn();
      const handleEdit = jest.fn();
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
      expect(handleClose.mock.calls.length).toBe(0);
      expect(handleRemove.mock.calls.length).toBe(1);
      expect(handleEdit.mock.calls.length).toBe(0);
    });

    it('onEdit when press enter on InputText', () => {
      const handleClose = jest.fn();
      const handleRemove = jest.fn();
      const handleEdit = jest.fn();
      const wrapper = mount(
        <ListItem
          id={'some-id'}
          text={'some text'}
          onClose={handleClose}
          onRemove={handleRemove}
          onEdit={handleEdit}
          checked={false}
        />
      );
      const text = wrapper.find(Text);
      expect(text).toExist();
      text.simulate('dblclick');

      const input = wrapper.find(InputText);
      expect(input).toExist();
      expect(handleEdit.mock.calls.length).toBe(0);

      input.simulate('change', { target: { value: 'some new text' } });
      expect(wrapper.state('text')).toBe('some new text');
      expect(handleEdit.mock.calls.length).toBe(0);

      input.simulate('keydown', { key: 'Enter' });
      expect(handleEdit.mock.calls.length).toBe(1);
      expect(handleClose.mock.calls.length).toBe(0);
      expect(handleRemove.mock.calls.length).toBe(0);
    });

    it('onEdit when blur on InputText', () => {
      const handleClose = jest.fn();
      const handleRemove = jest.fn();
      const handleEdit = jest.fn();
      const wrapper = mount(
        <ListItem
          id={'some-id'}
          text={'some text'}
          onClose={handleClose}
          onRemove={handleRemove}
          onEdit={handleEdit}
          checked={false}
        />
      );
      const text = wrapper.find(Text);
      expect(text).toExist();
      text.simulate('dblclick');

      const input = wrapper.find(InputText);
      expect(input).toExist();
      expect(handleEdit.mock.calls.length).toBe(0);

      input.simulate('change', { target: { value: 'some new text' } });
      expect(wrapper.state('text')).toBe('some new text');
      expect(handleEdit.mock.calls.length).toBe(0);

      const item = wrapper.find(Item);
      item.simulate('blur');
      expect(handleEdit.mock.calls.length).toBe(1);
      expect(handleClose.mock.calls.length).toBe(0);
      expect(handleRemove.mock.calls.length).toBe(0);
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

      expect(isCheckBoxChecked).toBeFalsy();
      expect(isTextChecked).toBeFalsy();
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

      expect(isCheckBoxChecked).toBeTruthy();
      expect(isTextChecked).toBeTruthy();
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
