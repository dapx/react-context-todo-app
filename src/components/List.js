// @flow
import * as React from 'react';
import styled from 'styled-components';
import memoize from 'memoize-one';
import ListItem from './ListItem';
import Option from './MenuOption';
import type { Todo } from '../flowtypes';
import {
  VisibilityFilter as Visibility,
  filterListByVisibility,
  pluralize
} from '../modules/List';
import Button from './Button';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: nowrap;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: nowrap;
  flex-direction: column;
  overflow: hidden;
`;

const FilterMenu = styled.div`
  display: flex;
  flex: 8;
  flex-wrap: wrap;
  justify-content: center;
  align-items: space-around;
`;

const Footer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  border-top: 1px solid #e6e6e6;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
    0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
    0 17px 2px -6px rgba(0, 0, 0, 0.2);
`;

const Info = styled.span`
  display: flex;
  flex: 1;
  margin: 5px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  color: #bfbfbf;
  font-size: 12px;
  font-weight: 300;
`;

const ClearButton = Button.extend`
  border: none;
  justify-content: flex-end;

  &:hover {
    text-decoration: underline;
  }
`;

type Props = {
  list: Todo[],
  visibility: string,
  onEditItem: (item: Todo) => void,
  onRemoveItem: (index: string) => void,
  onCloseItem: (index: string) => void,
  onClear: () => void
};

type State = {
  list: Todo[]
};

/**
 * List component to render todo items
 */
export default class List extends React.PureComponent<Props, State> {
  filter = memoize((list, visibility) =>
    filterListByVisibility(list, visibility)
  );

  hasCompleted = () => {
    const { list } = this.props;
    return list.find(item => item.isDone);
  };

  countItemsLeft = () => {
    const { list } = this.props;
    return list.reduce((acc, { isDone }) => (!isDone ? acc + 1 : acc), 0);
  };

  render() {
    const {
      list,
      visibility,
      onEditItem,
      onRemoveItem,
      onCloseItem,
      onClear
    } = this.props;
    const filteredList = this.filter(list, visibility);
    const itemsLeft = this.countItemsLeft();
    return (
      <Container>
        <Content>
          {filteredList.map(item => (
            <ListItem
              id={item.id}
              key={`${item.id}`}
              text={item.text}
              onEdit={onEditItem}
              onClose={onCloseItem}
              onRemove={onRemoveItem}
              checked={item.isDone}
            />
          ))}
        </Content>
        <Footer>
          <Info>{`${itemsLeft} ${pluralize(itemsLeft, 'item')} left`}</Info>
          <FilterMenu>
            <Option href={'#'} enabled={visibility === Visibility.NONE}>
              {'All'}
            </Option>
            <Option
              href={`#/${Visibility.TODO}`}
              enabled={visibility === Visibility.TODO}
            >
              {'Active'}
            </Option>
            <Option
              href={`#/${Visibility.DONE}`}
              enabled={visibility === Visibility.DONE}
            >
              {'Completed'}
            </Option>
          </FilterMenu>
          <ClearButton onClick={onClear} hidden={!this.hasCompleted()}>
            {'Clear completed'}
          </ClearButton>
        </Footer>
      </Container>
    );
  }
}
