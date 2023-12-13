import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { fetchGenres, navigateToListScreen, configureAxios } from '../api/moviedb';
import Loading from '../components/loading';
import { Mainstyles, Buttonstyles, theme } from '../theme';

const GenreScreen = () => {
  const navigation = useNavigation();
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        configureAxios();

        fetchGenres()
            .then((response) => {
                setGenres(response.genres || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching genres:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.heading}><Text style={Buttonstyles.text}>M</Text>ovie Genres</Text>
          <View style={styles.genreContainer}>
              {genres.map((genre) => (
                  <TouchableOpacity
                      key={genre.id}
                      style={styles.genreItem}
                      onPress={() => navigateToListScreen(genre.id, genre.name, navigation)}
                  >
                      <Text style={styles.genreText}>{genre.name}</Text>
                  </TouchableOpacity>
              ))}
          </View>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    heading: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    genreContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    genreItem: {
        padding: 10,
        margin: 10,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: theme.mainColor,
        backgroundColor: theme.background,
    },
    genreText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default GenreScreen;