import { createStackNavigator } from 'react-navigation-stack';
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from 'react-navigation-drawer';
import React, { useState } from 'react';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import * as authActions from '../store/actions/auth';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';

import Colors from '../constants/Colors';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};
const ProductsNavigator = createStackNavigator(
  {
    'Products Overview': {
      screen: ProductsOverviewScreen,
    },
    'Product Detail': {
      screen: ProductDetailScreen,
    },
    Cart: {
      screen: CartScreen,
    },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: {
      screen: OrdersScreen,
    },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const AdminNavigator = createStackNavigator(
  {
    'User Products': {
      screen: UserProductsScreen,
    },
    'Edit Product': {
      screen: EditProductScreen,
    },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const shopNavigator = createDrawerNavigator(
  {
    Products: {
      screen: ProductsNavigator,
    },
    Orders: {
      screen: OrdersNavigator,
    },
    Admin: {
      screen: AdminNavigator,
    },
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, padding: 30 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerNavigatorItems {...props} />
            <Button
              title='Logout'
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
                // props.navigation.navigate('Auth');
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);

const authNavigator = createStackNavigator(
  {
    Auth: {
      screen: AuthScreen,
    },
  },
  { defaultNavigationOptions: defaultNavOptions }
);

const mainNavigator = createSwitchNavigator({
  Startup: {
    screen: StartupScreen,
  },
  Auth: {
    screen: authNavigator,
  },
  Shop: {
    screen: shopNavigator,
  },
});
export default createAppContainer(mainNavigator);
