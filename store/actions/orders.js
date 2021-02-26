import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const setOrders = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://rn-shop-app-39b7b-default-rtdb.europe-west1.firebasedatabase.app/orders/u1.json'
      );
      if (!response.ok) {
        throw new Error('something went wrong');
      }
      const resData = await response.json();
      const loadedOrders = [];

      for (let key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }

      dispatch({ type: SET_ORDERS, orders: loadedOrders });
    } catch (error) {
      throw error;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    const date = new Date();
    const response = await fetch(
      'https://rn-shop-app-39b7b-default-rtdb.europe-west1.firebasedatabase.app/orders/u1.json',
      {
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );
    if (!response.ok) {
      throw new Error('something went wrong');
    }
    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    });
  };
};
