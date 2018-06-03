/**
 * @flow
 * The commons flow types that can be reused.
 */

export type Todo = {
  id: string,
  text: string,
  isDone: boolean
};

export type Event = {
  key: string,
  target: {
    value: string
  }
};
