import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import Visibility, { VisibilityFilter } from '../Visibility';

describe('Visibility Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Visibility urlSuffix={''}>
        {({ visibility }) => <span>{visibility}</span>}
      </Visibility>,
      div
    );
  });

  describe('should pass', () => {
    it('NONE visibility filter when url suffix is empty', () => {
      const wrapper = mount(
        <Visibility urlSuffix={''}>
          {({ visibility }) => <span>{visibility}</span>}
        </Visibility>
      );
      expect(wrapper.contains(<span>{VisibilityFilter.NONE}</span>)).toBe(true);
    });

    it('TODO visibility filter when url suffix is `active`', () => {
      const wrapper = mount(
        <Visibility urlSuffix={'active'}>
          {({ visibility }) => <span>{visibility}</span>}
        </Visibility>
      );
      expect(wrapper.contains(<span>{VisibilityFilter.TODO}</span>)).toBe(true);
    });

    it('DONE visibility filter when url suffix is `completed`', () => {
      const wrapper = mount(
        <Visibility urlSuffix={'completed'}>
          {({ visibility }) => <span>{visibility}</span>}
        </Visibility>
      );
      expect(wrapper.contains(<span>{VisibilityFilter.DONE}</span>)).toBe(true);
    });

    it('NONE visibility filter when url suffix is an unknown route', () => {
      const wrapper = mount(
        <Visibility urlSuffix={'some-unknown-suffix'}>
          {({ visibility }) => <span>{visibility}</span>}
        </Visibility>
      );
      expect(wrapper.contains(<span>{VisibilityFilter.NONE}</span>)).toBe(true);
    });
  });
});
