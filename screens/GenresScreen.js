import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Dimensions, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { StatusBar } from 'expo-status-bar';
import { fetchGenres, navigateToListScreen, configureAxios } from '../api/moviedb';
import Loading from '../components/loading';
import Header from '../components/header';
import { Mainstyles, Buttonstyles, theme } from '../theme';

const { width, height } = Dimensions.get('window');

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
        <View style={styles.container}>
            <Header title="Genre" />

            <ScrollView contentContainerStyle={styles.genreContainer}>
                {genres.map((genre) => (
                    <TouchableOpacity
                        key={genre.id}
                        style={styles.genreItem}
                        onPress={() => navigateToListScreen(genre.id, genre.name, navigation)}
                    >
                        <Text style={styles.genreText}>{genre.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        // flexGrow: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // paddingVertical: 20,
    },
    genreContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    genreItem: {
        alignItems: 'center',
        padding: 10,
        margin: 10,
        width: width/2.5,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: theme.mainColor,
        backgroundColor: theme.background,
    },
    genreText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default GenreScreen;