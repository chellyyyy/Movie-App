import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import { fallbackPersonImage, image185 } from '../api/moviedb';

export default function Cast({ cast, navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Top Cast</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {cast &&
          cast.map((person, index) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('Person', person)} style={styles.castItem}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={{ uri: image185(person?.profile_path) || fallbackPersonImage }}
                />
              </View>

              <Text style={styles.characterText}>
                {person?.character.length > 10 ? person.character.slice(0, 10) + '...' : person?.character}
              </Text>
              <Text style={styles.nameText}>
                {person?.original_name.length > 10 ? person.original_name.slice(0, 10) + '...' : person?.original_name}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginLeft: 16,
  },
  text: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },
  scrollContainer: {
    paddingHorizontal: 15,
  },
  castItem: {
    marginRight: 12,
    alignItems: 'center',
  },
  imageContainer: {
    overflow: 'hidden',
    borderRadius: 50,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  characterText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
  nameText: {
    color: '#ccc',
    fontSize: 12,
  },
});