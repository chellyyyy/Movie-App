import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchTrendingMovies, fetchUpcomingMovies, fetchTopRatedMovies, image500 } from '../api/moviedb';
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';

const HomeScreen = ({ navigation }) => {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

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
  // const truncateText = (text, length) => {
  //   if (text.length > length) {
  //     return text.slice(0, length) + '...';
  //   } else {
  //     return text;
  //   }
  // };

  return (
    <ScrollView>
      {trending.length > 0 && <TrendingMovies title="Trending" data={trending} />}
      {/* <MovieList title="Upcoming" data={upcoming} /> */}
      { upcoming.length>0 && <MovieList title="Upcoming" data={upcoming} /> }
      {/* <MovieList title="Top Rated" data={topRated} /> */}
      { topRated.length>0 && <MovieList title="Top Rated" data={topRated} /> }
    </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   movieHeader: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     margin: 10,
//   },
//   movieItem: {
//     marginRight: 10,
//     alignItems: 'center',
//   },
//   posterImage: {
//     width: 150,
//     height: 225,
//     borderRadius: 10,
//   },
//   movieTitle: {
//     marginTop: 5,
//     fontSize: 14,
//   },
// });

export default HomeScreen;