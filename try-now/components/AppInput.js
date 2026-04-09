import { TextInput } from 'react-native';

export default function AppInput(props) {
  return (
    <TextInput
      {...props}
      placeholderTextColor="#888"
      style={{ backgroundColor:'#111', color:'#fff', padding:15, borderRadius:12, marginVertical:8 }}
    />
  );
}