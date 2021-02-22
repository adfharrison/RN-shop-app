import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  return (
    <View>
      <Text>ProductsOverviewScreen</Text>
      <FlatList
        data={products}
        renderItem={(itemData) => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onViewDetail={() => {}}
            onAddToCart={() => {}}
          />
        )}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({});

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products',
};

export default ProductsOverviewScreen;
