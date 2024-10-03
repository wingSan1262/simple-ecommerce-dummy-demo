import React from 'react';
import {View, Text, Image, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {appendCart, useReduxSelector} from '../../base/store';
import {useDispatch} from 'react-redux';

export function ProductDetailScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // Access the currentProduct state from the Redux store
  const {currentProduct} = useReduxSelector(state => state.app);
  const product = currentProduct;
  return (
    <View style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={{uri: 'https://via.placeholder.com/64'}} // replace with your image url
        style={{width: 64, height: 64, borderRadius: 32, marginBottom: 10}}
      />
      <Text>{product.ProductName}</Text>
      <Text>{product.Dimension}</Text>
      <Text>{`${product.Currency} ${product.Price - product.Discount} / ${
        product.Unit
      }`}</Text>
      <View style={{height: 20}} />
      <Button
        title="        Buy        "
        onPress={() => {
          dispatch(appendCart(product));
          navigation.goBack();
        }}
      />
    </View>
  );
}
