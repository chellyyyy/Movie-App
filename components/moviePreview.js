import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback, ScrollView, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { fallbackMoviePoster, image185 } from '../api/moviedb';
import { useNavigation } from '@react-navigation/native';
import { Mainstyles } from '../theme';

const { width, height } = Dimensions.get('window');

const PreviewScreenItem = ({ item, index }) => {
    const navigation = useNavigation();

    return (
        <TouchableWithoutFeedback key={index} onPress={() => navigation.push('Detail', item)}>
            <View style={styles.resultItem}>
                <Image
                    source={{ uri: image185(item.poster_path) || fallbackMoviePoster }}
                    style={styles.image}
                />
                <Text style={styles.title}>
                    {item.title.length > 22 ? item.title.slice(0, 22) + '...' : item.title}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const PreviewScreens = ({ results }) => {

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.resultText}>Results ({results.length})</Text>
            <View style={styles.resultsContainer}>
                {
                    results.map((item, index) => (
                        <PreviewScreenItem item={item} index={index} />
                    ))
                }
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        margin: 16,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#8a8a8a',
        borderRadius: 20,
    },
    input: {
        paddingBottom: 1,
        paddingLeft: 6,
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        letterSpacing: 0.5,
    },
    iconContainer: {
        borderRadius: 20,
        padding: 9,
        margin: 1,
        backgroundColor: '#8a8a8a',
    },
    scrollContainer: {
        paddingHorizontal: 15,
    },
    resultText: {
        color: 'white',
        fontWeight: '600',
        marginLeft: 16,
        marginBottom: 5,
    },
    resultsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    resultItem: {
        marginBottom: 20,
        alignItems: 'center',
    },
    image: {
        width: width * 0.44,
        height: height * 0.3,
        borderRadius: 12,
    },
    title: {
        color: '#d3d3d3',
        // marginLeft: 16,
    },
    noResultsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    noResultsImage: {
        height: 250,
        width: 250,
    },
});

export default PreviewScreens;