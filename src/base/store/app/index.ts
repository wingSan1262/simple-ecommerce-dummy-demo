import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Articles} from '../../../domain/services/features/newsapi';
import {Product} from '../../../data/SqLiteApi';

export interface CartItem {
  product: Product;
  quantity: number;
}

type AppState = {
  error: ErrorNotif;
  currentNews: Articles;
  login: LoginCredentials;
  products: Product[];
  cart: CartItem[];
  currentProduct: Product;
};

type ErrorNotif = {
  isError: boolean;
  isLoading?: boolean;
  message: string;
};

type LoginCredentials = {
  email: string;
  password: string;
};

const initialState: AppState = {
  error: {
    isError: false,
    message: '',
  },
  currentNews: {},
  login: {
    email: '',
    password: '',
  },
  products: [],
  cart: [],
  currentProduct: {
    ProductCodeID: '',
    ProductName: '',
    Price: 0,
    Currency: '',
    Discount: 0,
    Dimension: '',
    Unit: '',
  },
};

export type LoginParams = {
  email: string;
  password: string;
};

export type CheckOutParams = {
  cart: CartItem[];
  userNameId: string;
  transactionCode: string;
  transactionNumberId: string;
};

const appReducerName = 'app';
const appSlice = createSlice({
  name: appReducerName,
  initialState,
  reducers: {
    setErrorNotif(state: AppState, action: PayloadAction<ErrorNotif>) {
      state.error = action.payload;
    },
    setCurrentNews(state: AppState, action: PayloadAction<Articles>) {
      state.currentNews = action.payload;
    },
    setLoginCredentials(
      state: AppState,
      action: PayloadAction<LoginCredentials>,
    ) {
      state.login = action.payload;
    },
    appendCart(state: AppState, action: PayloadAction<Product>) {
      const product = action.payload;
      const existingCartItem = state.cart.find(
        item => item.product.ProductCodeID === product.ProductCodeID,
      );

      if (existingCartItem) {
        // If the product is already in the cart, increase the quantity
        existingCartItem.quantity += 1;
      } else {
        // If the product is not in the cart, add it with a quantity of 1
        state.cart.push({product: product, quantity: 1});
      }
    },
    clearCart(state: AppState) {
      state.cart = [];
    },
    setCurrentProduct(state: AppState, action: PayloadAction<Product>) {
      state.currentProduct = action.payload;
    },
    // like replace or add cart item
    replaceCartItem(state: AppState, action: PayloadAction<CartItem>) {
      const {product, quantity} = action.payload;
      const existingCartItem = state.cart.find(
        item => item.product.ProductCodeID === product.ProductCodeID,
      );
      if (existingCartItem) {
        existingCartItem.quantity = quantity;
      } else {
        state.cart.push({product: product, quantity: quantity});
      }
    },
  },
});

export const appReducer = {[appReducerName]: appSlice.reducer};
export const {
  clearCart,
  setCurrentProduct,
  appendCart,
  setErrorNotif,
  setCurrentNews,
  replaceCartItem,
  setLoginCredentials,
} = appSlice.actions;
