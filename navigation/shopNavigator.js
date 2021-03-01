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

//create default header config for all pages in stacks
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

// create shop stack
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
      // icon assigned to this stack in the side drawer
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    // assign default header config
    defaultNavigationOptions: defaultNavOptions,
  }
);

// create orders stack
const OrdersNavigator = createStackNavigator(
  {
    Orders: {
      screen: OrdersScreen,
    },
  },
  {
    // icon assigned to this stack in side drawer
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    // header config
    defaultNavigationOptions: defaultNavOptions,
  }
);

// create admin stack
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
    // icon assigned to this stack in side drawer
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },

    //header config
    defaultNavigationOptions: defaultNavOptions,
  }
);

// create side drawer, populate it with all stacks
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

    // to get a login button with functionality directly in side drawer:
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, padding: 30 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            {/* all current drawer items */}
            <DrawerNavigatorItems {...props} />
            {/* logout button dispatches logout function */}
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

//create auth stack
const authNavigator = createStackNavigator(
  {
    Auth: {
      screen: AuthScreen,
    },
  },
  // header config
  { defaultNavigationOptions: defaultNavOptions }
);

// stack startup, then auth, then shop navs
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
// export entire nav container
export default createAppContainer(mainNavigator);
