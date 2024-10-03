import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ParentStackParamList} from './type';
import * as screens from '../../feature/screen';

const ParentStack = createNativeStackNavigator<ParentStackParamList>();

export const NavigationGraph = () => {
  return (
    <ParentStack.Navigator
      initialRouteName={'LoginScreen'}
      screenOptions={{
        gestureEnabled: false,
        headerTintColor: '#000',
      }}>
      <ParentStack.Screen
        name={'LoginScreen'}
        component={screens.LoginScreen}
        options={{headerShown: false}}
      />
      <ParentStack.Screen
        name={'ProductScreens'}
        component={screens.ProductListScreen}
        options={{headerShown: false}}
      />
      <ParentStack.Screen
        name={'ProductDetailScreen'}
        component={screens.ProductDetailScreen}
        options={{headerShown: false}}
      />
      <ParentStack.Screen
        name={'CheckoutListScreen'}
        component={screens.CheckoutList}
        options={{headerShown: false}}
      />
    </ParentStack.Navigator>
  );
};
