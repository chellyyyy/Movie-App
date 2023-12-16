import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Header } from '../../components/header';
import { theme } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { InputPassword } from '../../components/input';

const PasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSavePassword = () => {
    if (newPassword === confirmPassword) {
      // Gọi API ở đây
      Alert.alert('Success', 'Password changed successfully!');
    } else {
      Alert.alert('Error', 'Passwords do not match. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Change Password" hideSearch={true} />
      <View style={styles.content}>
        
        <InputPassword
          title='New Password'
          value={newPassword}
          handleChangeText={(text) => setNewPassword(text)}
        />

        <InputPassword
          title='Confirm Password'
          value={confirmPassword}
          handleChangeText={(text) => setConfirmPassword(text)}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSavePassword}>
          <Text style={styles.saveButtonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  content: {
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'white',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: theme.grayColor,
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    color: 'white',
  },
  saveButton: {
    backgroundColor: theme.mainColor,
    borderRadius: 8,
    padding: 10,
    marginTop: 26,
  },
  saveButtonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default PasswordScreen;