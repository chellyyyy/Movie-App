import React from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image185, image342, poster342 } from '../api/moviedb';
import { Mainstyles } from '../theme';
import PreviewScreen from './moviePreview';

const { width, height } = Dimensions.get('window');

export default function MovieList({ title, hideSeeAll, data }) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{title} Movies</Text>
                {!hideSeeAll && (
                    <TouchableOpacity>
                        <Text style={Mainstyles.text}>See All</Text>
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContainer}
            >
                {data.map((item, index) => {
                    return (
                        <TouchableWithoutFeedback key={index} onPress={() => navigation.push('Detail', item)}>
                            <View style={styles.movieItemContainer}>
                                <Image
                                    source={{ uri: image185(item.poster_path) || fallbackMoviePoster }}
                                    style={styles.movieImage}
                                />
                                <Text style={styles.movieTitle}>
                                    {item.title.length > 15 ? item.title.slice(0, 14) + '...' : item.title}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    );
                })}
            </ScrollView>
        </View>
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
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
    },
    seeAllText: {
        // color: 'blue',
        // fontSize: 20,
    },
    scrollViewContainer: {
        paddingHorizontal: 15,
    },
    movieItemContainer: {
        marginRight: 5,
        marginVertical: 5,
        alignItems: 'center',
    },
    movieImage: {
        width: width * 0.33,
        height: height * 0.22,
        borderRadius: 20,
    },
    movieTitle: {
        color: 'white',
        // marginLeft: 4,
    },
});