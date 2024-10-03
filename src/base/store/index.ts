import {configureStore, PreloadedState} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {rootReducer} from './RootReducer';
import {combinedMiddleware} from '../../domain';
import Reactotron from '../../../ReactotronConfig';

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(combinedMiddleware),
    preloadedState,
    enhancers: e =>
      Reactotron?.createEnhancer ? e.concat(Reactotron.createEnhancer()) : e,
  });
};

const store = setupStore();

type RootState = ReturnType<typeof rootReducer>;
type AppStore = ReturnType<typeof setupStore>;
type AppDispatch = AppStore['dispatch'];

setupListeners(store.dispatch);

const useReduxDispatch = () => useDispatch<AppDispatch>();
const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;

export {store, useDispatch, useReduxDispatch, useReduxSelector, useSelector};
export type {AppStore, RootState};
export * from './app';
