import { useEffect } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('token');
      router.replace(token ? '/(tabs)/home' : '/login');
    })();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
      <ActivityIndicator color="#00FF99" />
    </View>
  );
}