import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import Colors from '../constants/Colors';
import { createAppContainer } from 'react-navigation';

const ProductsNavigator = createStackNavigator(
  {
    'Products Overview': {
      screen: ProductsOverviewScreen,
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    },
  }
);

export default createAppContainer(ProductsNavigator);
