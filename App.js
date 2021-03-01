import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import ShopNavigator from './navigation/shopNavigator';
import NavigationContainer from './navigation/NavigationContainer';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import { composeWithDevTools } from 'redux-devtools-extension';
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';

// combine all reducers
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});

// instantiate store wit hall reducers
const store = createStore(
  rootReducer,

  // devtools
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

// get the packaged fonts
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  // fonts have to load before app can render
  if (!fontLoaded) {
    return (
      //appLoading stalls loading until fonts load. MUST HAVE AN onError!!
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={(err) => {
          console.log(err);
        }}
      />
    );
  }
  // once fonts loaded:
  return (
    //provider is redux wrapper for store. takes a store prop, which is instantiated store with all teh reduceers
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
