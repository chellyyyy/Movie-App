import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView, Platform, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/moviedb';
import Loading from '../components/loading';
import { Mainstyles, Buttonstyles, theme } from '../theme';
import IonIcon from 'react-native-vector-icons/Ionicons';


const topMargin = 20;
const { width, height } = Dimensions.get('window');

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isFavourite, toggleFavourite] = useState(false);
  const [isWatchLater, toggleWatchLater] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getMovieDetials(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetials = async (id) => {
    const data = await fetchMovieDetails(id);
    console.log('got movie details');
    setLoading(false);
    if (data) {
      setMovie({ ...movie, ...data });
    }
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    console.log('got movie credits');
    if (data && data.cast) {
      setCast(data.cast);
    }
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    console.log('got similar movies');
    if (data && data.results) {
      setSimilarMovies(data.results);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} style={styles.container}>
      {/* back button and movie poster */}
      <View style={{ width: '100%' }}>
        <SafeAreaView style={styles.buttonContainer}>
          <TouchableOpacity style={[Buttonstyles.background, styles.buttonContainerItem]} onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>

          <View style={[styles.buttonContainerItem, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
            <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)} >
              <HeartIcon size={35} color={isFavourite ? theme.mainColor : 'white'} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image source={{ uri: image500(movie.poster_path) || fallbackMoviePoster }} style={{ width: width, height: height * 0.55 }} />
            <LinearGradient
              colors={['transparent', 'rgba(12, 12, 12, 0.8)', 'rgba(12, 12, 12, 1)']}
              style={{ width: width, height: height * 0.40, position: 'absolute', bottom: 0 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          </View>
        )}
      </View>

      {/* movie details */}

      <View style={{ marginTop: -(height * 0.09), marginVertical: 12 }}>
        {/* title */}
        <Text style={styles.movieTitle}>{movie?.title}</Text>

        {/* status, release year, runtime */}
        {movie?.id ? (
          <Text style={styles.movieDetails}>
            {movie?.status} • {movie?.release_date?.split('-')[0] || 'N/A'} • {movie?.runtime} min
          </Text>
        ) : null}

        {/* genres  */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: 16, marginVertical: 8 }}>
          {movie?.genres?.map((genre, index) => {
            let showDot = index + 1 !== movie.genres.length;
            return (
              <Text key={index} style={styles.genreText}>
                {genre?.name} {showDot ? '• ' : null}
              </Text>
            );
          })}
        </View>

        {/* watch later */}
        <View style={styles.buttonWatchLater}>
          <TouchableOpacity onPress={() => toggleWatchLater(!isWatchLater)} >
            <IonIcon name={isWatchLater ? 'checkmark' : 'add'} size={35} color={'white'} />
          </TouchableOpacity>
          <Text style={styles.movieDescription}>Watch Later</Text>
        </View>

        {/* description */}
        <Text style={styles.movieDescription}>{movie?.overview}</Text>

        {/* Button "Play Now" */}
        <TouchableOpacity
          style={[styles.movieButton, Buttonstyles.background]}
          onPress={() => navigation.navigate("Video", { videoKey: movie?.videos?.results[0]?.key })}
        >
          <IonIcon name={"play"} size={25} color={'white'} />
          <Text style={styles.movieButtonText}>Play Now</Text>
        </TouchableOpacity>

      </View>

      {/* cast */}
      {movie?.id && cast.length > 0 && <Cast navigation={navigation} cast={cast} />}

      {/* similar movies section */}
      {movie?.id && similarMovies.length > 0 && <MovieList title={'Similar'} hideSeeAll={true} data={similarMovies} />}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#121212',
  },
  buttonContainer: {
    position: 'absolute',
    zIndex: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: topMargin,
  },
  buttonContainerItem: {
    borderRadius: 10,
    padding: 1,
  },
  buttonWatchLater: {
    // justifyContent: 'center',
    // alignContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 1,
    marginBottom: 10,
  },
  movieTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1.2,
  },
  movieDetails: {
    color: '#8a8a8a',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  genreText: {
    color: '#8a8a8a',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  movieDescription: {
    color: '#8a8a8a',
    textAlign: 'justify',
    marginHorizontal: 16,
    letterSpacing: 0.5,
  },
  movieButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    marginHorizontal: 100,
  },
  movieButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});