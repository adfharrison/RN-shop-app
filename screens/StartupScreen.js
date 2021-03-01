import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
} from 'react-native';
import Colors from '../constants/Colors';

import { useDispatch } from 'react-redux';

import * as authActions from '../store/actions/auth';

// screen renders at top of main nav stack.
const StartupScreen = (props) => {
  const dispatch = useDispatch();

  // check storage for auth data
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        // if no data on local storage, go to auth screen
        props.navigation.navigate('Auth');
        return;
      }
      // if there is data, check if token still valid
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        // if invalid, go to auth screen
        props.navigation.navigate('Auth');
        return;
      }

      // if all is valid, login with new expiration calculation and nav to shop
      const expirationTime = expirationDate.getTime() - new Date().getTime();
      props.navigation.navigate('Shop');
      dispatch(authActions.authenticate(token, userId, expirationTime));
    };

    tryLogin();
  });
  return (
    <View style={styles.screen}>
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default StartupScreen;
