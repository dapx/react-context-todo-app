import { pluralize, filterListByVisibility } from '../List';
import { VisibilityFilter as Visibility } from '../Visibility';

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

  describe('filterListByVisibility', () => {
    const isDone = true;
    const list = [
      { isDone },
      { isDone: !isDone },
      { isDone },
      { isDone },
      { isDone: !isDone },
      { isDone }
    ];

    it('should none visibility returns the same list', () => {
      expect(list.length).toEqual(6);
      const filteredList = filterListByVisibility(list, Visibility.NONE);
      expect(filteredList).toBe(list);
    });

    it('should done visibility returns only isDone list items', () => {
      expect(list.length).toEqual(6);
      const filteredList = filterListByVisibility(list, Visibility.DONE);
      expect(filteredList.length).toEqual(4);
      filteredList.forEach(i => expect(i.isDone).toBeTruthy());
    });

    it('should todo visibility returns only uncompleted list items', () => {
      expect(list.length).toEqual(6);
      const filteredList = filterListByVisibility(list, Visibility.TODO);
      expect(filteredList.length).toEqual(2);
      filteredList.forEach(i => expect(i.isDone).toBeFalsy());
    });

    it('should wrong visibility returns the same list items', () => {
      expect(list.length).toEqual(6);
      const filteredList = filterListByVisibility(list, 'SOME WRONG TEXT');
      expect(filteredList).toBe(list);
    });
  });
});
