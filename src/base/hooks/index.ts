import {useDispatch} from 'react-redux';
import {CheckOutParams, LoginParams, setErrorNotif} from '../store';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  checkOut,
  getAvailableItems,
  login,
  Product,
  ResourceState,
} from '../../data/SqLiteApi';

export const ShowError = (isError: boolean, error: any) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  let message = error?.data?.message ?? '';

  if (message.length <= 0) {
    message = error?.message ?? '';
  }

  if (message.length <= 0) {
    message = t('defaultError');
  }

  useEffect(() => {
    if (isError) {
      dispatch(
        setErrorNotif({
          message: message,
          isError: true,
        }),
      );
    }
  }, [isError, dispatch, message]);
};

type UseLoginHook = {
  executeLogin: (params: LoginParams) => Promise<void>;
  loading: boolean;
  error: boolean;
  message: string;
  isSuccess: boolean;
};
export const useLogin = (): UseLoginHook => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const executeLogin = async (params: LoginParams) => {
    console.log('executeLogin');
    setLoading(true);
    setError(false);
    setIsSuccess(false);
    try {
      const result: ResourceState<boolean> = await login(
        params.email,
        params.password,
      );
      if (result.isSuccess) {
        setIsSuccess(true);
      } else {
        setError(true);
        setMessage(result.error ?? 'Error during login');
      }
    } catch (err) {
      setError(true);
      setMessage(JSON.stringify(err) ?? 'Error during login');
    } finally {
      setLoading(false);
    }
  };

  return {
    executeLogin,
    loading,
    error,
    message,
    isSuccess,
  };
};

type UseQueryProductsHook = {
  queryProducts: () => Promise<void>;
  loading: boolean;
  error: boolean;
  message: string;
  products: Product[];
};

export const useQueryProducts = (): UseQueryProductsHook => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  const queryProducts = async () => {
    setLoading(true);
    setError(false);
    try {
      const result: ResourceState<Product[]> = await getAvailableItems();
      if (result.isSuccess) {
        setProducts(result.data ?? []);
      } else {
        setError(true);
        setMessage(result.error ?? 'Error during product query');
      }
    } catch (err) {
      setError(true);
      setMessage(JSON.stringify(err) ?? 'Error during product query');
    } finally {
      setLoading(false);
    }
  };

  return {
    queryProducts,
    loading,
    error,
    message,
    products,
  };
};

type UseCheckOutHook = {
  executeCheckOut: (params: CheckOutParams) => Promise<void>;
  loading: boolean;
  error: boolean;
  message: string;
  isSuccess: boolean;
};

export const useCheckOut = (): UseCheckOutHook => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const executeCheckOut = async (params: CheckOutParams) => {
    setLoading(true);
    setError(false);
    setIsSuccess(false);
    try {
      const result: ResourceState<boolean> = await checkOut(
        params.cart,
        params.userNameId,
        params.transactionCode,
        params.transactionNumberId,
      );
      if (result.isSuccess) {
        setIsSuccess(true);
      } else {
        setError(true);
        setMessage(result.error ?? 'Error during checkout');
      }
    } catch (err) {
      setError(true);
      setMessage(JSON.stringify(err) ?? 'Error during checkout');
    } finally {
      setLoading(false);
    }
  };

  return {
    executeCheckOut,
    loading,
    error,
    message,
    isSuccess,
  };
};
