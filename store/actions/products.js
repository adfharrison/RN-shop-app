import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://rn-shop-app-39b7b-default-rtdb.europe-west1.firebasedatabase.app/products.json'
      );
      if (!response.ok) {
        throw new Error('something went wrong');
      }
      const resData = await response.json();
      const loadedProducts = [];

      for (let key in resData) {
        loadedProducts.push(
          new Product(
            key,
            'u1',
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    } catch (error) {
      throw error;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://rn-shop-app-39b7b-default-rtdb.europe-west1.firebasedatabase.app/products/${productId}.json`,
      {
        method: 'DELETE',
      }
    );
    if (!response.ok) {
      throw new Error('something went wrong');
    }
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://rn-shop-app-39b7b-default-rtdb.europe-west1.firebasedatabase.app/products.json',
      {
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, imageUrl, price }),
      }
    );
    const resData = await response.json();

    // console.log(resData);
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://rn-shop-app-39b7b-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json`,
      {
        method: 'PATCH',
        header: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, imageUrl }),
      }
    );
    if (!response.ok) {
      throw new Error('something went wrong');
    }
    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      },
    });
  };
};
