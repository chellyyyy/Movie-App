import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { fetchMovieDetails, fetchMovieVideo } from '../api/moviedb';
import { Mainstyles, theme } from '../theme';

const { width, height } = Dimensions.get('window');

const ViewScreen = () => {
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [movie, setMovie] = useState({});
    const [videoUri, setVideoUri] = useState('');

    useEffect(() => {
        const fetchMovieDetailsAndVideo = async () => {
            const details = await fetchMovieDetails(item.id);
            setMovie(details);

            const uri = await fetchMovieVideo(item.id);
            setVideoUri(uri);
        };

        fetchMovieDetailsAndVideo();
    }, [item.id]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity style={[Mainstyles.background, { borderRadius: 10, padding: 1 }]} onPress={() => navigation.goBack()}>
                <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
            </TouchableOpacity>

            {/* Video Player */}
            {videoUri && (
                <Video
                    source={{ uri: videoUri }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="contain"
                    shouldPlay
                    style={{ width: width, height: height * 0.4 }}
                />
            )}

            {/* Movie Details */}
            <View style={styles.movieDetailsContainer}>
                <Text style={styles.movieTitle}>{movie.title}</Text>
                <Text style={styles.movieDetails}>
                    {movie.status} • {movie.release_date?.split('-')[0] || 'N/A'} • {movie.runtime} min
                </Text>
                <Text style={styles.movieDescription}>{movie.overview}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    movieDetailsContainer: {
        margin: 16,
    },
    movieTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 1.2,
    },
    movieDetails: {
        color: '#8a8a8a',
        fontWeight: '600',
        fontSize: 16,
        marginVertical: 8,
    },
    movieDescription: {
        color: '#8a8a8a',
        fontSize: 16,
        marginTop: 8,
    },
});

export default ViewScreen;