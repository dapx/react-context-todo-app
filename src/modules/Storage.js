/**
 * Provides funtions to manage the browser localStorage.
 */

export function loadData(namespace) {
  const list = localStorage.getItem(namespace);
  return (list && JSON.parse(list)) || [];
}

export function saveData(namespace, data) {
  localStorage.setItem(namespace, JSON.stringify(data));
}
