import {Platform, StatusBar} from 'react-native';
import React from 'react';
import {navigationRef} from './Navigator';
import {NavigationGraph} from './NavigationGraph';
import {NavigationContainer} from '@react-navigation/native';
import {Portal, Snackbar} from 'react-native-paper';
import {setErrorNotif, useReduxSelector} from '../store';
import {useDispatch} from 'react-redux';

export const NavigationParent = () => {
  const {error} = useReduxSelector(s => s.app);
  const dispatch = useDispatch();

  return (
    <>
      <StatusBar
        barStyle={Platform.select({ios: 'dark-content', android: 'default'})}
      />
      <NavigationContainer ref={navigationRef}>
        <NavigationGraph />
      </NavigationContainer>
      <Portal>
        <Snackbar
          visible={error.isError}
          onDismiss={() =>
            dispatch(setErrorNotif({message: '', isError: false}))
          }
          duration={3000}>
          {error.message}
        </Snackbar>
      </Portal>
    </>
  );
};
