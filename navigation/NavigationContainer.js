import React, { useEffect, useRef } from 'react';
import ShopNavigator from './shopNavigator';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';

// this wrapper round the ShopNav is required to have access to store and be able to listen to changes in the logge in state in teh
// store, and so be able to automatically navigate back to the login screen when it is no longer true
const NavigationContainer = (props) => {
  // create a ref to use with the ShopNav
  const navRef = useRef();

  // isAuth will be false if there is no token, which will happen if the timeout expires
  const isAuth = useSelector((state) => !!state.auth.token);

  // listen to changes in isAuth in store
  useEffect(() => {
    if (!isAuth) {
      // get current ref of shopnav, use it to navigate back to auth screen when isAuth changes
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: 'Auth' })
      );
    }
  }, [isAuth]);
  return <ShopNavigator ref={navRef} />;
};

export default NavigationContainer;
