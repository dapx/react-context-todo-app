import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import RouterProvider, { withRouter } from '../Router';

const Hash = withRouter(props => <span>{props.urlSuffix}</span>);

describe('RouterProvider', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RouterProvider />, div);
  });

  describe('should pass', () => {
    it('empty url suffix when access index', () => {
      const wrapper = mount(
        <RouterProvider>
          <Hash />
        </RouterProvider>
      );
      expect(window.location.href).toBe('http://localhost/');
      expect(wrapper.state('suffix')).toEqual('');
    });

    it('url suffix `active` when access active route', () => {
      const wrapper = mount(
        <RouterProvider>
          <Hash />
        </RouterProvider>
      );
      window.changeUrlHash('active');
      expect(window.location.href).toBe('http://localhost/#/active');
      expect(wrapper.state('suffix')).toEqual('active');
      wrapper.update();
      expect(wrapper.contains('active')).toBe(true);
    });

    it('url suffix `completed` when access completed route', () => {
      const wrapper = mount(
        <RouterProvider>
          <Hash />
        </RouterProvider>
      );
      window.changeUrlHash('completed');
      expect(window.location.href).toBe('http://localhost/#/completed');
      expect(wrapper.state('suffix')).toEqual('completed');
      wrapper.update();
      expect(wrapper.contains('completed')).toBe(true);
    });

    it('any url suffix as url suffix', () => {
      const wrapper = mount(
        <RouterProvider>
          <Hash />
        </RouterProvider>
      );
      window.changeUrlHash('some-unknown-path');
      expect(window.location.href).toBe('http://localhost/#/some-unknown-path');
      expect(wrapper.state('suffix')).toEqual('some-unknown-path');
    });
  });
});
