import Register from './register';
import Login from './login';
import Main from './main';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
const screens = {
  Login: {
    screen: Login,
  },
  Home: {
    screen: Main,
  },
  Register: {
    screen: Register,
  },
};

const Stack = createStackNavigator(screens, {
  headerMode: 'none',
});

export default createAppContainer(Stack);
