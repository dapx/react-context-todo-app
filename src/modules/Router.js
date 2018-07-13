import React from 'react';
import PropTypes from 'prop-types';

const { Provider, Consumer } = React.createContext();

class RouterProvider extends React.PureComponent {
  state = {
    suffix: this.getSuffix()
  };

  getSuffix() {
    return window.location.hash.replace(/^#\//, '');
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.handleHashChange);
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.handleHashChange);
  }

  handleHashChange = () => {
    const suffix = this.getSuffix();
    this.setState({ suffix });
  };

  render() {
    const context = {
      ...this.state
    };
    return <Provider value={context}>{this.props.children}</Provider>;
  }
}

RouterProvider.propTypes = {
  children: PropTypes.node
};

export function withRouter(Component) {
  return function RoutedComponent(props) {
    return (
      <Consumer>
        {({ suffix }) => <Component {...props} urlSuffix={suffix} />}
      </Consumer>
    );
  };
}

export default RouterProvider;
