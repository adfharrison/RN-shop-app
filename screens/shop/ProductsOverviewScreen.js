import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  Button,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('Product Detail', {
      productId: id,
      productTitle: title,
    });
  };
  return (
    <View>
      <FlatList
        data={products}
        renderItem={(itemData) => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          >
            <Button
              color={Colors.primary}
              title='View Details'
              onPress={() => {
                selectItemHandler(itemData.item.id, itemData.item.title);
              }}
            />
            <Button
              color={Colors.primary}
              title='Add To Cart'
              onPress={() => {
                dispatch(cartActions.addToCart(itemData.item));
              }}
            />
          </ProductItem>
        )}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({});

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'All Products',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Cart'
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    ),
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
  };
};

export default ProductsOverviewScreen;
