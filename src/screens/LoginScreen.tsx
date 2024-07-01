import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { loginUser } from '../store/slices/userSlice';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation(); // Initialize useNavigation hook

  const handleLogin = () => {
    dispatch(loginUser({ username, password }));
    navigation.navigate('Products');
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
