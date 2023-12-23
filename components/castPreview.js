import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { fallbackPersonImage, image185 } from '../api/moviedb';
import { useNavigation } from '@react-navigation/native';
import { Mainstyles } from '../theme';
import { AuthContext } from '../AuthContext';

const { width, height } = Dimensions.get('window');

const CastPreviewItem = ({ index, person }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity key={index} onPress={() => navigation.navigate('Person', person)} style={styles.castItem}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: image185(person?.profile_path) || fallbackPersonImage }}
                />
            </View>

            <Text style={styles.nameText}>
                {person?.original_name && person.original_name.length > 10 ? person.original_name.slice(0, 10) + '...' : person?.original_name}
            </Text>

        </TouchableOpacity>
    );
};

const CastPreview = ({ results, hideResults }) => {

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
        >
            {hideResults && (
                <Text style={styles.resultText}>Results ({results.length})</Text>
            )}
            <View style={styles.resultsContainer}>
                {
                    results.map((item, index) => (
                        <CastPreviewItem key={index} person={item} />
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
        position: 'relative',
    },
    title: {
        color: 'white',
        fontSize: 18,
        position: 'absolute',
        bottom: 0,
        textAlign: 'center',
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
    voteContainer: {
        position: 'absolute',
        top: 5,
        left: 5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 3,
        borderRadius: 10,
    },
    voteText: {
        fontWeight: 'bold',
        color: 'white',
        padding: 3,
        borderRadius: 8,
        borderWidth: 2,
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
    borderRadius: 80,
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
  castItem: {
    marginHorizontal: 15,
    marginVertical: 10,
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
    marginBottom: 5,
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

export default CastPreview;