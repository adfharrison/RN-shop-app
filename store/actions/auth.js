export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

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
    dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
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
    dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
  };
};
