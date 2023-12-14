import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Mainstyles, Buttonstyles, theme } from '../theme';

const EditAccountScreen = () => {
  const [name, setName] = useState('Your Name');
  const [avatar, setAvatar] = useState('');
  const [password, setPassword] = useState('Your Password');
  const [email, setEmail] = useState('Your Email');

  const avatarSource = avatar ? { uri: avatar } : { uri: 'https://i.pinimg.com/736x/c9/bc/a5/c9bca57cf02ef46be89630414a89b5f5.jpg', };

  return (
    <View style={styles.container}>
      <Image source={avatarSource} style={styles.avatar} />
      <Text style={styles.label}>Tên:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Text style={styles.label}>Mật khẩu:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button title="Lưu thay đổi" onPress={() => saveChanges()} />
    </View>
  );
};

const saveChanges = () => {
  // Đưa dữ liệu về máy chủ hoặc xử lý lưu trữ dữ liệu ở đây
  // Bạn có thể gọi API hoặc thực hiện các tác vụ lưu trữ dữ liệu cần thiết
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme.background,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  label: {
    fontSize: 16,
    marginTop: 16,
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    width: 200,
    color: 'white',
  },
});

export const AccountScreenOptions = {
  tabBarLabel: 'Tài khoản',
  tabBarIcon: ({ color, size }) => (
    <Ionicons name="person" color={color} size={size} />
  ),
};

export default EditAccountScreen;