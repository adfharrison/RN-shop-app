import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import Colors from '../../constants/Colors';

const ProductItem = (props) => {
  return (
    <View style={styles.product}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: props.image }} />
      </View>

      <View style={styles.details}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.price}>£ {props.price.toFixed(2)}</Text>
      </View>

      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title='View Details'
          onPress={props.onViewDetail}
        />
        <Button
          color={Colors.primary}
          title='Add To Cart'
          onPress={props.onAddToCart}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { height: 2, width: 0 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  details: {
    alignItems: 'center',
    height: '15%',
    padding: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  title: {
    fontSize: 18,
    marginVertical: 3,
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20,
  },
});
export default ProductItem;
