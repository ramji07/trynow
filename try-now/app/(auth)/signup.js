import { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { router } from 'expo-router';
import api from '../../services/api';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signup = async () => {
    try {
      await api.post('/auth/signup', { name, email, password });
      router.replace('/login');
    } catch {
      Alert.alert('Signup Failed');
    }
  };

  return (
    <View style={{ flex:1, justifyContent:'center', padding:20, backgroundColor:'#0A0A0A' }}>
      <Text style={{ color:'#fff', fontSize:28, marginBottom:20 }}>Signup</Text>
      <AppInput placeholder="Name" value={name} onChangeText={setName} />
      <AppInput placeholder="Email" value={email} onChangeText={setEmail} />
      <AppInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <AppButton title="Create Account" onPress={signup} />
    </View>
  );
}