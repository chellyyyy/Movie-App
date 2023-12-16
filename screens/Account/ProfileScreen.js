import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Header } from '../../components/header';
import { theme } from '../../theme';
import { InputProfile } from '../../components/input';

const ProfileScreen = () => {
  const [name, setName] = useState('Your Name');
  const [email, setEmail] = useState('Your Email');
  const [age, setAge] = useState('Your Age');
  const [address, setAddress] = useState('Your Address');

  const handleSaveProfile = () => {
    Alert.alert('Success', 'Profile saved successfully!');
  };

  return (
    <View style={styles.container}>
      <Header title="Profile" hideSearch={true} />
      <View style={styles.content}>

        <InputProfile
          title='User Name'
          value={name}
          handleChangeText={(text) => setName(text)}
        />

        <InputProfile
          title='Email'
          value={email}
          handleChangeText={(text) => setEmail(text)}
        />

        <InputProfile
          title='Age'
          value={age}
          handleChangeText={(text) => setAge(text)}
        />

        <InputProfile
          title='Address'
          value={address}
          handleChangeText={(text) => setAddress(text)}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
          <Text style={styles.saveButtonText}>Save Profile</Text>
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
  input: {
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
    // alignSelf: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default ProfileScreen;