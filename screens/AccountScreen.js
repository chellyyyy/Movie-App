import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, Text, StyleSheet, Image, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';
import { Mainstyles, Buttonstyles, theme } from '../theme';
import { HeaderMovit } from '../components/header';

const AccordionHeader = ({ title, icon, onPress, isOpen }) => {
  return (
    <TouchableOpacity style={styles.userAccordionHeader} onPress={onPress} >
      <View style={styles.titleAccordion}>
        <Ionicons name={icon} size={30} color={'white'} />
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <Ionicons name={isOpen ? 'caret-down' : 'caret-forward'} size={20} color={'white'} />
    </TouchableOpacity>
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

  const [isPersonal, togglePersonal] = useState(false);
  const [isSettings, toggleSettings] = useState(false);
  const [isSupport, toggleSupport] = useState(false);

  const [watchLater, setWatchLater] = useState([]);
  const [favoriteFilms, setFavoriteFilms] = useState([]);
  const [favoriteCast, setFavoriteCast] = useState([]);

  useEffect(() => {
    getWatchLater();
    getFavoriteFilms();
  }, []);

  const getWatchLater = async () => {
    const data = await fetchUpcomingMovies();
    console.log('got upcoming', data.results.length);
    if (data && data.results) setWatchLater(data.results);
  };

  const getFavoriteFilms = async () => {
    const data = await fetchTopRatedMovies();
    console.log('got top rated', data.results.length);
    if (data && data.results) setFavoriteFilms(data.results);
  };

  return (
    <View style={styles.container}>
      <HeaderMovit title="Account" hideSearch={'true'} />
      <ScrollView style={{ padding: 16 }}>

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
              // onPress={logoutUser}
            />
          </View>
          <AccordionItem title="Edit Profile" icon="person" onPress={() => navigation.navigate('Profile')} />
          <AccordionItem title="Change password" icon="lock-closed" onPress={() => navigation.navigate('Password')} />
        </View>

        <View style={styles.userAccordion}>
          <AccordionHeader title="Personal list" icon="heart-circle"
            onPress={() => togglePersonal(!isPersonal)} isOpen={isPersonal}
          />
          {isPersonal && (
            <>
              <AccordionItem title="Watch Later" icon="add"
                onPress={() => navigation.navigate("List", { title: "Watch Later", data: watchLater })}
              />
              <AccordionItem title="Favorite films" icon="film"
                onPress={() => navigation.navigate("List", { title: "Favorite Films", data: favoriteFilms })}
              />
              <AccordionItem title="Favorite Casts" icon="people"
                onPress={() => navigation.navigate("Casts", { title: "Favorite Casts" })}
                // onPress={() => navigation.navigate("Cast", { title: "Favorite Casts", cast: cast })}
              />
            </>
          )}
        </View>

        <View style={styles.userAccordion}>
          <AccordionHeader title="Settings" icon="settings"
            onPress={() => toggleSettings(!isSettings)} isOpen={isSettings}
          />
          {isSettings && (
            <>
              <AccordionItem title="Version: 1.0.0" icon="alert-circle" hideIcon={'false'} />
              <AccordionItem title="languages" icon="globe" onPress={() => navigation.navigate('Languages')} />
              <AccordionItem title="thumbnail view" icon="images" hideIcon={'false'} />
              <AccordionItem title="plays in the background" icon="volume-high" hideIcon={'false'} />
            </>
          )}
        </View>

        <View style={styles.userAccordion}>
          <AccordionHeader title="Support" icon="information-circle"
            onPress={() => toggleSupport(!isSupport)} isOpen={isSupport}
          />
          {isSupport && (
            <>
              <AccordionItem title="Information" icon="document-text" onPress={() => navigation.navigate('Information')} />
              <AccordionItem title="terms of use" icon="reader" onPress={() => navigation.navigate('Use')} />
              <AccordionItem title="Privacy Policy" icon="shield-checkmark" onPress={() => navigation.navigate('Privacy')} />
              <AccordionItem title="Contact" icon="headset" onPress={() => navigation.navigate('Contact')} />
            </>
          )}
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
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