import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import { HeaderMovit } from '../components/header';
import { StatusBar } from 'expo-status-bar';
import { fetchTrendingMovies, fetchNowPlayingMovies, fetchUpcomingMovies, fetchTopRatedMovies, fetchPopularMovies, fetchCountryMovies } from '../api/moviedb';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { Mainstyles, Buttonstyles, theme } from '../theme';
import { AuthContext } from '../AuthContext';

export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [vietNam, setVietNam] = useState([]);
  const [japan, setJapan] = useState([]);
  const [korea, setKorea] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language } = useContext(AuthContext);
  const navigation = useNavigation();

  const isVietnamese = language === 'vi';

  // const {
  //   loading, language,
  //   page, setPage, totalPage,
  //   trending, upcoming, topRated,
  //   fetchTrending, fetchUpcoming, fetchTopRated,
  // } = useContext(AuthContext);

  // useEffect(() => {
  //   setPage(1)
  // }, []);

  // useEffect(() => {
  //   if (page > 0) {
  //     fetchTrending();
  //     fetchUpcoming();
  //     fetchTopRated();
  //   }
  // }, [page, language])

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        getTrendingMovies(),
        getNowPlayingMovies(),
        getUpcomingMovies(),
        getTopRatedMovies(),
        getPopularMovies(),
        getVietNamMovies(),
        getJapanMovies(),
        getKoreaMovies(),
      ]);
      setLoading(false);
    };
  
    fetchData();
  }, [language]);

  const getTrendingMovies = async ()=>{
    const data = await fetchTrendingMovies(language);
    console.log('got trending', data.results.length)
    if(data && data.results) setTrending(data.results);
  }
  const getNowPlayingMovies = async ()=>{
    const data = await fetchNowPlayingMovies(language);
    console.log('got now playing', data.results.length)
    if(data && data.results) setNowPlaying(data.results);
  }
  const getUpcomingMovies = async ()=>{
    const data = await fetchUpcomingMovies(language);
    console.log('got upcoming', data.results.length)
    if(data && data.results) setUpcoming(data.results);
  }
  const getTopRatedMovies = async ()=>{
    const data = await fetchTopRatedMovies(language);
    console.log('got top rated', data.results.length)
    if(data && data.results) setTopRated(data.results);
  }
  const getPopularMovies = async ()=>{
    const data = await fetchPopularMovies(language);
    console.log('got popular', data.results.length)
    if(data && data.results) setPopular(data.results);
  }
  const getVietNamMovies = async ()=>{
    const data = await fetchCountryMovies(language, 'VN');
    console.log('got Viet Nam', data.results.length)
    if(data && data.results) setVietNam(data.results);
  }
  const getJapanMovies = async ()=>{
    const data = await fetchCountryMovies(language, 'JP');
    console.log('got Japan', data.results.length)
    if(data && data.results) setJapan(data.results);
  }
  const getKoreaMovies = async ()=>{
    const data = await fetchCountryMovies(language, 'KP');
    console.log('got Viet Nam', data.results.length)
    if(data && data.results) setKorea(data.results);
  }

  return (
    <View style={styles.container}>
      <HeaderMovit />
      {loading ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
          {trending.length > 0 && <TrendingMovies title={isVietnamese ? "Phim thịnh hành" : "Trending Movies"} data={trending} />}
          {nowPlaying.length > 0 && <MovieList title={isVietnamese ? "Phim Đang chiếu" : "Now Playing Movies"} data={nowPlaying} />}
          {upcoming.length > 0 && <MovieList title={isVietnamese ? "Phim sắp chiếu" : "Upcoming Movies"} data={upcoming} />}
          {topRated.length > 0 && <MovieList title={isVietnamese ? "Phim xếp hạng cao" : "Top Rated Movies"} data={topRated} />}
          {popular.length > 0 && <MovieList title={isVietnamese ? "Phim nổi tiếng" : "Popular Movies"} data={popular} />}
          {vietNam.length > 0 && <MovieList title={isVietnamese ? "Phim Việt Nam" : "Vietnamese Movies"} data={vietNam} />}
          {japan.length > 0 && <MovieList title={isVietnamese ? "Phim Nhật" : "Japanese Movies"} data={japan} />}
          {korea.length > 0 && <MovieList title={isVietnamese ? "Phim Hàn" : "Korean Movies"} data={korea} />}
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