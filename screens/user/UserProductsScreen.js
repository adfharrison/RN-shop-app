import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  Button,
} from 'react-native';

import { useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { useDispatch } from 'react-redux';
import * as productsActions from '../../store/actions/products';

import Colors from '../../constants/Colors';

const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const editProducthandler = (id) => {
    props.navigation.navigate('Edit Product', { productId: id });
  };
  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => (
        <ProductItem
          onSelect={() => {
            editProducthandler(itemData.item.id);
          }}
          price={itemData.item.price}
          image={itemData.item.imageUrl}
          title={itemData.item.title}
        >
          <Button
            color={Colors.primary}
            title='Edit'
            onPress={() => {
              editProducthandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title='Delete'
            onPress={() => {
              dispatch(productsActions.deleteProduct(itemData.item.id));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({});

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'User Products',

    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Add'
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => {
            navData.navigation.navigate('Edit Product');
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProductsScreen;
