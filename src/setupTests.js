import 'jest-enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzime from 'enzyme';

Enzime.configure({ adapter: new Adapter() });
