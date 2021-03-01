import { AsyncStorage } from 'react-native';
import { set } from 'react-native-reanimated';

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

// instantiate timer
let timer;

// redux-thunk allows this syntax of returning a dispatching of an async function

export const authenticate = (token, userId, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, token: token, userId, userId });
  };
};

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBat78hMz2XHkkCyQJWHDC76MqEc80_VAI`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      const errResData = await response.json();
      const errorId = errResData.error.message;
      let message = 'Something went wrong';

      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email is already in use';
      }
      throw new Error(message);
    }
    const resData = await response.json();
    console.log('signed up');
    dispatch(
      authenticate(
        resData.idToken,
        resData.localId,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const tokenExpires = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveToStorage(resData.idToken, resData.localId, tokenExpires);
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBat78hMz2XHkkCyQJWHDC76MqEc80_VAI`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      const errResData = await response.json();
      const errorId = errResData.error.message;
      let message = 'Something went wrong';

      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email does not belong to existing user';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid';
      }
      throw new Error(message);
    }
    const resData = await response.json();
    console.log('logged in');
    dispatch(
      authenticate(
        resData.idToken,
        resData.localId,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const tokenExpires = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveToStorage(resData.idToken, resData.localId, tokenExpires);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};
const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};
const saveToStorage = (token, userId, expiryDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expiryDate.toISOString(),
    })
  );
};
