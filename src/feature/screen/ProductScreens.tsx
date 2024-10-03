import React, {useEffect} from 'react';
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  Button,
  Image,
} from 'react-native';
import {useQueryProducts} from '../../base/hooks';
import {Product} from '../../data/SqLiteApi';
import {navigate} from '../../base/navigationstheme/Navigator';
import { useDispatch } from "react-redux";
import { setCurrentProduct } from "../../base/store";

export function ProductListScreen() {
  const {queryProducts, loading, error, message, products} = useQueryProducts();
  const dispatch = useDispatch();
  useEffect(() => {
    queryProducts();
  }, []);

  const renderItem = (item: Product) => (
    <View
      style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
      <View style={{marginRight: 10}}>
        {}
        <Image
          source={{uri: 'https://via.placeholder.com/64'}} // replace with your image url
          style={{width: 64, height: 64, borderRadius: 32}}
        />
      </View>
      <View style={{flex: 1}}>
        <Text>{item.ProductName}</Text>
        <Text>{`${item.Currency} ${item.Price}`}</Text>
      </View>
      <Button
        title="Buy"
        onPress={() => {
          dispatch(setCurrentProduct(item));
          navigate('ProductDetailScreen');
        }}
      />
    </View>
  );

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{message}</Text>;
  }

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        style={{ width: '100%' , height: '90%'}}
        data={products}
        renderItem={item => renderItem(item.item)}
        keyExtractor={item => item.ProductCodeID}
      />
      <View style={{ height: 20 }} />
      <Button
        title="Go to Checkout"
        onPress={() => navigate('CheckoutListScreen')}
      />
    </View>
  );
}
