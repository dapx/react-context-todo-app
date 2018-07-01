/**
 * This module provides useful pure functions
 * to obtain information from a todo List.
 */
import { VisibilityFilter } from './Visibility';

export function filterListByVisibility(list = [], visibility) {
  switch (visibility) {
    case VisibilityFilter.DONE:
      return list.filter(todo => todo.isDone);

    case VisibilityFilter.TODO:
      return list.filter(todo => !todo.isDone);

    default:
      return list;
  }
}

export function pluralize(count, word) {
  return count !== 1 ? `${word}s` : word;
}
