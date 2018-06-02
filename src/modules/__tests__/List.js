import { pluralize } from '../List';

describe('list module', () => {
  describe('pluralize', () => {
    it('should returns singular word when count is 1', () => {
      const singularWord = pluralize(1, 'item');
      expect(singularWord).toEqual('item');
    });

    it('should returns plural word when count is 0', () => {
      const singularWord = pluralize(0, 'item');
      expect(singularWord).toEqual('items');
    });

    it('should returns singular word when count is 2', () => {
      const singularWord = pluralize(2, 'item');
      expect(singularWord).toEqual('items');
    });
  });
});
