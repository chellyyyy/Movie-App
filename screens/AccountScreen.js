import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, Text, StyleSheet, Image, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { navigateToListScreen } from '../api/moviedb';
import { Ionicons } from '@expo/vector-icons';
import { Mainstyles, Buttonstyles, theme } from '../theme';

const AccordionHeader = ({ title, icon, hideIcon }) => {
  return (
    <View style={styles.userAccordionHeader}>
      <View style={styles.titleAccordion}>
        <Ionicons name={icon} size={30} color={'white'} />
        <Text style={styles.titleText}>{title}</Text>
      </View>
      {hideIcon && (
        <Ionicons name='caret-forward' size={20} color={'white'} />
      )}
    </View>
  );
};

const AccordionItem = ({ title, icon, onPress, hideIcon }) => {
  return (
    <View style={{ borderColor: theme.grayColor, borderTopWidth: 1 }}>
      <TouchableOpacity style={styles.userAccordionItem} onPress={onPress}>
        <View style={styles.titleAccordion}>
          <Ionicons name={icon} size={20} color={theme.grayColor} />
          <Text style={styles.textAccordion}>{title}</Text>
        </View>
        {!hideIcon && (
          <Ionicons name='chevron-forward' size={20} color={theme.grayColor} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const AccountScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('Your Name');
  const [avatar, setAvatar] = useState('');
  const [password, setPassword] = useState('Your Password');
  const [email, setEmail] = useState('Your Email');

  const avatarSource = avatar ? { uri: avatar } : { uri: 'https://i.pinimg.com/736x/c9/bc/a5/c9bca57cf02ef46be89630414a89b5f5.jpg', };

  return (
    <ScrollView style={styles.container}>

      <View style={styles.userAccordion}>
        <View style={styles.titleAccordion}>
          <Image source={avatarSource} style={styles.avatar} />
          <Text style={styles.titleText}>{name}</Text>
        </View>
        <View style={{ borderRadius: 30, overflow: 'hidden' }}>
          <Button
            title="Log out"
            color={theme.mainColor}
            onPress={() => Alert.alert('Simple Button pressed')}
          />
        </View>

        <AccordionItem title="View Profile" icon="person" />
        <AccordionItem title="Change password" icon="lock-closed" />
      </View>

      <View style={styles.userAccordion}>
        <AccordionHeader title="Personal list" icon="heart-circle" />

        <AccordionItem title="View history" icon="document-text" />
        <AccordionItem title="Favorite movies" icon="film" />
        <AccordionItem title="Favorite actors" icon="people" />
      </View>

      <View style={styles.userAccordion}>
        <AccordionHeader title="Settings" icon="settings" />

        <AccordionItem title="Version: 1.0.0" icon="alert-circle" hideIcon={'false'} />
        <AccordionItem title="languages" icon="globe" onPress={() => navigation.navigate('Languages')} />
        <AccordionItem title="information" icon="information-circle" />
        <AccordionItem title="terms of use" icon="reader" onPress={() => navigation.navigate('Use')} />
        <AccordionItem title="Privacy Policy" icon="shield-checkmark" onPress={() => navigation.navigate('Privacy')} />
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    padding: 16,
    backgroundColor: theme.background,
  },
  userAccordion: {
    backgroundColor: theme.subBackground,
    padding: 13,
    borderRadius: 16,
    marginBottom: 16,
    gap: 13,
  },
  textAccordion: {
    fontSize: 16,
    color: 'white',
    marginLeft: 5,
    textTransform: 'capitalize',
  },
  titleAccordion: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAccordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userAccordionItem: {
    paddingTop: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  titleText: {
    textTransform: 'capitalize',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
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

export default AccountScreen;