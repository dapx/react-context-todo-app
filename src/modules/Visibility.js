import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';

export const VisibilityFilter = {
  NONE: '',
  DONE: 'completed',
  TODO: 'active'
};

function getVisibilityByUrlSuffix(suffix) {
  const isValidSuffix =
    VisibilityFilter.TODO === suffix || VisibilityFilter.DONE === suffix;
  return isValidSuffix ? suffix : VisibilityFilter.NONE;
}

/**
 * Visibility Component
 * It uses render props pattern to manage
 * todos visibility based on url suffix.
 */
export default class Visibility extends React.Component {
  getVisibility = memoize(suffix => getVisibilityByUrlSuffix(suffix));

  render() {
    const { urlSuffix } = this.props;
    const visibility = this.getVisibility(urlSuffix);
    return this.props.children({ visibility });
  }
}

Visibility.propTypes = {
  urlSuffix: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired
};
