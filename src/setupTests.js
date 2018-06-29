import 'jest-enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzime from 'enzyme';

Enzime.configure({ adapter: new Adapter() });
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

const changeUrlHash = hash => {
  global.window.location.href = `http://localhost/#/${hash}`;
  global.window.dispatchEvent(new Event('hashchange'));
};

global.window.changeUrlHash = changeUrlHash;
global.localStorage = localStorageMock;
