import React, {useState} from 'react';
import {Button, TextInput, View, ActivityIndicator} from 'react-native';
import {useLogin} from '../../base/hooks';
import { setErrorNotif, setLoginCredentials } from "../../base/store";
import {useDispatch} from 'react-redux';
import {navigate} from '../../base/navigationstheme/Navigator';

export function LoginScreen() {
  const [userNameId, setUserNameId] = useState('');
  const [password, setPassword] = useState('');
  const {executeLogin, loading, error, message, isSuccess} = useLogin();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    await executeLogin({email: userNameId, password});
    if (isSuccess) {
      dispatch(setLoginCredentials({email: userNameId, password}));
      navigate('ProductScreens');
    } else if (error) {
      dispatch(
        setErrorNotif({
          message: message,
          isError: true,
        }),
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      }}>
      <TextInput
        value={userNameId}
        onChangeText={setUserNameId}
        placeholder="User Name ID"
        style={{
          width: '80%',
          padding: 10,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
        }}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={{
          width: '80%',
          padding: 10,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
        }}
      />
      <Button onPress={handleLogin} title="Login" disabled={loading} />
      {loading && <ActivityIndicator style={{marginTop: 16}} />}
    </View>
  );
}
