import {combineReducers} from 'redux';

import {appReducer} from './app';
import {baseApiReducer} from '../../domain/services/ApiClient';

const rootReducer = combineReducers({
  ...appReducer,
  // ...mainReducer,
  ...baseApiReducer,
});

export {rootReducer};
