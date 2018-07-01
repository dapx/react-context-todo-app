// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import TodoProvider, { withAdd, withTodos } from './modules/Todo';
import InputText from './components/InputText';
import List from './components/List';
import RouterProvider, { withRouter } from './modules/Router';
import Visibility from './modules/Visibility';

const Window = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 0 10% 0 10%;
`;

const Header = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  margin: 0 0 -40px 0;
`;

const Paper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  display: flex;
  font-size: 100px;
  font-weight: 100;
  justify-content: center;
  color: rgba(175, 47, 47, 0.15);
  text-rendering: optimizeLegibility;
`;

const RoutedVisibility = withRouter(Visibility);
const TodoInput = withAdd(InputText);
const TodoList = withTodos(List);

type Props = {};

class App extends Component<Props> {
  render() {
    return (
      <Window>
        <Container>
          <Header>
            <Title>todos</Title>
          </Header>
          <Paper>
            <RouterProvider>
              <RoutedVisibility
                render={({ visibility }) => (
                  <TodoProvider visibility={visibility}>
                    <TodoInput />
                    <TodoList />
                  </TodoProvider>
                )}
              />
            </RouterProvider>
          </Paper>
        </Container>
      </Window>
    );
  }
}

export default App;
