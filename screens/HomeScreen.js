import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import { HeaderMovit } from '../components/header';
import { StatusBar } from 'expo-status-bar';
// import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { Mainstyles, Buttonstyles, theme } from '../theme';
import { AuthContext } from '../AuthContext';

export default function HomeScreen() {
  const {
    loading,
    page, setPage, totalPage,
    fetchTrending, fetchUpcoming, fetchTopRated,
    trending, upcoming, topRated
  } = useContext(AuthContext);

  useEffect(() => {
    setPage(1)
  }, []);

  useEffect(() => {
    if (page > 0) {
      fetchTrending();
    }
  }, [page])

  useEffect(() => {
    if (page > 0) {
      fetchUpcoming();
    }
  }, [page])

  useEffect(() => {
    if (page > 0) {
      fetchTopRated();
    }
  }, [page])

  return (
    <View style={styles.container}>
      <HeaderMovit />
      {loading ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
          {trending.length > 0 && <TrendingMovies title="Trending" data={trending} />}
          {upcoming.length > 0 && <MovieList title="Upcoming" data={upcoming} />}
          {topRated.length > 0 && <MovieList title="Top Rated" data={topRated} />}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
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
  text: {
    ...StyleSheet,
  },
  scrollContainer: {
    paddingBottom: 10,
  },
});