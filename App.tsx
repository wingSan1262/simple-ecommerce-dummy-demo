/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import './src/base';
import {PaperProvider} from 'react-native-paper';
import {NavigationParent, theme} from './src/base/navigationstheme';
import {Provider} from 'react-redux';
import {store} from './src/base/store';
import {db, setupDummyData} from './src/data/SqLite';

import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));

function App(): JSX.Element {
  db;
  setupDummyData();
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationParent />
      </PaperProvider>
    </Provider>
  );
}

export default App;
