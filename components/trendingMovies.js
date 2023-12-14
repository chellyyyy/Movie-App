import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Dimensions, ScrollView, StyleSheet } from 'react-native'; // Import StyleSheet
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../api/moviedb';

const { width, height } = Dimensions.get('window');

export default function TrendingMovies({ title, data }) {
    const navigation = useNavigation();

    const handleClick = (item) => {
        navigation.navigate('Detail', item);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{title}</Text>
            <ScrollView horizontal={true} style={styles.scrollViewContainer}>
                {data.map((item, index) => (
                    <MovieCard key={index} handleClick={handleClick} item={item} />
                ))}
            </ScrollView>
        </View>
    );
}

const MovieCard = ({ item, handleClick }) => {
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <View style={styles.movieItemContainer}>
                <Image
                    source={{ uri: image500(item.poster_path) }}
                    style={styles.movieImage}
                />
                <View style={styles.voteContainer}>
                    {(item.vote_average || 0) > 7 ? (
                        <Text style={[styles.voteText, { color: 'green' }]}>
                            {(item.vote_average || 0).toFixed(1)}
                        </Text>
                    ) : (item.vote_average || 0) > 5.5 ? (
                        <Text style={[styles.voteText, { color: 'orange' }]}>
                            {(item.vote_average || 0).toFixed(1)}
                        </Text>
                    ) : (
                        <Text style={[styles.voteText, { color: 'red' }]}>
                            {(item.vote_average || 0).toFixed(1)}
                        </Text>
                    )}
                </View>
                <Text style={styles.movieTitle}>
                    {item.title.length > 20 ? item.title.slice(0, 14) + '...' : item.title}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 8,
        marginVertical: 4,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 4,
    },
    titleText: {
        // color: 'white', 
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 5
    },
    seeAllText: {
        // color: 'blue',
    },
    scrollViewContainer: {
        paddingHorizontal: 15,
    },
    movieItemContainer: {
        marginRight: 10,
        marginVertical: 5,
        alignItems: 'center',
        position: 'relative',
    },
    movieImage: {
        width: width * 0.6,
        height: height * 0.4,
        borderRadius: 20,
        marginRight: 10,
    },
    movieTitle: {
        color: 'white',
        fontSize: 20,
    },
    voteContainer: {
        position: 'absolute',
        top: 5,
        left: 5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 5,
        borderRadius: 10,
    },
    voteText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
});
