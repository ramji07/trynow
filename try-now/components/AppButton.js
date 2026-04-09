import { TouchableOpacity, Text } from 'react-native';

export default function AppButton({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ backgroundColor:'#00FF99', padding:15, borderRadius:12, marginVertical:8 }}>
      <Text style={{ textAlign:'center', fontWeight:'bold' }}>{title}</Text>
    </TouchableOpacity>
  );
}