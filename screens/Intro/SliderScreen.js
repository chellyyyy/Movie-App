// SliderScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { theme } from '../../theme';

const slides = [
  {
    key: '1',
    image: { uri: 'https://elight.edu.vn/wp-content/uploads/2020/08/pha%CC%82n-bie%CC%A3%CC%82t-movie-va%CC%80-film-1200x675.png' },
    text: 'Discover Rich Content',
  },
  {
    key: '2',
    image: { uri: 'https://elight.edu.vn/wp-content/uploads/2020/08/pha%CC%82n-bie%CC%A3%CC%82t-movie-va%CC%80-film-1200x675.png' },
    text: 'Enjoy Anytime, Anywhere',
  },
  {
    key: '3',
    image: { uri: 'https://elight.edu.vn/wp-content/uploads/2020/08/pha%CC%82n-bie%CC%A3%CC%82t-movie-va%CC%80-film-1200x675.png' },
    text: 'Simple and Easy to Use',
  },
];

const SliderScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={[styles.slide]}>
      <Image style={styles.image} source={item.image} />
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  const onDone = () => {
    navigation.navigate('Introducing');
  };

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={onDone}
      // activeDotStyle={{ backgroundColor: theme.background }}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.background,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 50,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    textTransform: 'capitalize',
  },
});

export default SliderScreen;