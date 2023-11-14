import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Dimensions, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image185, searchMovies } from '../api/moviedb';
import { debounce } from 'lodash';
import Loading from '../components/loading';
import { Mainstyles } from '../theme';

const { width, height } = Dimensions.get('window');

export default function SearchScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = search => {
    if (search && search.length > 2) {
      setLoading(true);
      searchMovies({
        query: search,
        include_adult: false,
        language: 'en-US',
        page: '1'
      }).then(data => {
        console.log('got search results');
        setLoading(false);
        if (data && data.results) setResults(data.results);
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView style={styles.container}>
      {/* search input */}
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor={'lightgray'}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconContainer}>
          <XMarkIcon size={25} color="white" />
        </TouchableOpacity>
      </View>

      {/* search results */}
      {loading ? (
        <Loading />
      ) :
        results.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.resultText}>Results ({results.length})</Text>
            <View style={styles.resultsContainer}>
              {
                results.map((item, index) => (
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
                ))
              }
            </View>
          </ScrollView>
        ) : (
          <View style={styles.noResultsContainer}>
            <Image
              source={require('../assets/images/movieTime.png')}
              style={styles.noResultsImage}
            />
          </View>
        )
      }
    </SafeAreaView>
  );
}

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
  },
  resultsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  resultItem: {
    marginBottom: 20,
  },
  image: {
    width: width * 0.44,
    height: height * 0.3,
    borderRadius: 12,
  },
  title: {
    color: '#d3d3d3',
    marginLeft: 16,
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