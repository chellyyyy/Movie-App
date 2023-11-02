import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchTrendingMovies, image500 } from '../api/moviedb';

const HomeScreen = ({ navigation }) => {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);


  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    console.log('got trending', data.results.length)
    if (data && data.results) setTrending(data.results);
    setLoading(false)
  }
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    console.log('got upcoming', data.results.length)
    if (data && data.results) setUpcoming(data.results);
  }
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    console.log('got top rated', data.results.length)
    if (data && data.results) setTopRated(data.results);
  }

  // Hàm để cắt tên phim nếu quá dài và thêm dấu '...'
  const truncateText = (text, length) => {
    if (text.length > length) {
      return text.slice(0, length) + '...';
    } else {
      return text;
    }
  };

  return (
    <View>
      <Text style={styles.movieHeader}>Phim Hot</Text>
      <FlatList
        data={trending}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Detail', { movieId: item.id })}>
            <View style={styles.movieItem}>
              <Image
                source={{ uri: image500(item.poster_path) }}
                style={styles.posterImage}
              />
              <Text style={styles.movieTitle}>{truncateText(item.title, 20)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  movieHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  movieItem: {
    marginRight: 10,
    alignItems: 'center',
  },
  posterImage: {
    width: 150,
    height: 225,
    borderRadius: 10,
  },
  movieTitle: {
    marginTop: 5,
    fontSize: 14,
  },
});

export default HomeScreen;