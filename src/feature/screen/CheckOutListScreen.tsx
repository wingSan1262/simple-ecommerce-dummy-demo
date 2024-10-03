import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  FlatList,
  TextInput,
} from 'react-native';
import {
  clearCart,
  replaceCartItem,
  setErrorNotif,
  useReduxSelector,
} from '../../base/store';
import {useCheckOut} from '../../base/hooks';
import uuid from 'react-native-uuid';
import {Product} from '../../data/SqLiteApi';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux'; // Import your custom hook

interface RenderItemProps {
  item: Product;
  quantity: number;
}

const RenderItem: React.FC<RenderItemProps> = ({item, quantity}) => {
  const [inputQuantity, setInputQuantity] = useState(quantity.toString());
  const dispatch = useDispatch();
  let timeout: NodeJS.Timeout;

  async function setInputQuantityWith300msDebounce(value: string) {
    let valueNew = 0;
    // check NaN
    if (isNaN(parseInt(value))) {
      valueNew = 0;
    } else {
      valueNew = parseInt(value);
    }

    setInputQuantity(valueNew.toString());
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      dispatch(replaceCartItem({product: item, quantity: valueNew}));
    }, 300);
  }

  useEffect(() => {
    setInputQuantity(quantity.toString());
  }, [quantity]);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'center',
      }}>
      <View style={{marginRight: 10}}>
        <Image
          source={{uri: 'https://via.placeholder.com/64'}} // replace with your image url
          style={{width: 64, height: 64, borderRadius: 32}}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <Text>{item.ProductName}</Text>
        <Text>{`${item.Currency} ${item.Price - item.Discount}`}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text>Quantity: </Text>
          <TextInput
            value={inputQuantity}
            onChangeText={setInputQuantityWith300msDebounce}
            keyboardType="numeric"
            style={{borderWidth: 1, borderColor: 'gray', padding: 5, width: 50}}
          />
        </View>
      </View>
    </View>
  );
};
export function CheckoutList() {
  // Access the cart state from the Redux store
  const {cart, login} = useReduxSelector(state => state.app);
  // Use your custom checkout hook
  const {executeCheckOut, loading, error, message, isSuccess} = useCheckOut();
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const [price, setPrice] = useState('');

  function calculatePrice() {
    let totalPrice = 0;
    cart.forEach(item => {
      totalPrice +=
        (item.product.Price - item.product.Discount) * item.quantity;
    });
    setPrice('Total Price : Rp ' + totalPrice.toString());
  }

  useEffect(() => {
    calculatePrice();
  }, [cart]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearCart());
      navigation.goBack();
    }
    if (error) {
      dispatch(
        setErrorNotif({
          message: JSON.stringify(message),
          isError: true,
        }),
      );
    }
  }, [isSuccess, error]);

  return (
    <View style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>{price}</Text>
      <View style={{height: 30}} />

      {cart.map(item => {
        return <RenderItem item={item.product} quantity={item.quantity} />;
      })}
      <Button
        disabled={loading}
        title="Checkout"
        onPress={() => {
          executeCheckOut({
            cart: cart,
            userNameId: login.email,
            transactionCode: 'TRX',
            transactionNumberId: uuid.v4().toString(),
          });
        }}
      />
    </View>
  );
}
