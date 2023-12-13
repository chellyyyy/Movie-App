import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { StatusBar } from 'expo-status-bar';
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
        <View style={styles.container}>
            <SafeAreaView style={[styles.safeArea, Mainstyles.headerBackground]}>
                <StatusBar style="light" />
                <View style={styles.header}>
                    <Text style={styles.title}>
                        <Text style={Mainstyles.mainText}>M</Text>ovies Genre
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

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
    safeArea: {
        paddingVertical: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16,
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
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