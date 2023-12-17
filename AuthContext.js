import React, { createContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { apiKey } from './api/moviedb';

const AuthContext = createContext();

const MovieProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const [header, setHeader] = useState("Trending");
  const [totalPage, setTotalPage] = useState(null)
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [page, setPage] = useState(1);
  const [activegenre, setActiveGenre] = useState(28);
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true);
  const [backgenre, setBackGenre] = useState(false);
  const [language, setLanguage] = useState('en');
  // const [user, setUser] = useAuthState(auth)
  // const navigate = useNavigation();

  useEffect(() => {
    if (page < 1) {
      setPage(1)
    }
  }, [page]);

  const loginUser = (enteredEmail, enteredPassword) => {
    if (enteredEmail === 'A' && enteredPassword === 'A') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      Alert.alert("Incorrect email or password.");
    }
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
  };

  const filteredGenre = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${activegenre}&api_key=${apiKey}&page=${page}`
    );
    const filteredGenre = await data.json();
    setMovies(movies.concat(filteredGenre.results));
    setTotalPage(filteredGenre.total_pages);
    setLoading(false);
  };

  const fetchSearch = async (query) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=${language}&query=${query}&page=1&include_adult=false`
    );
    const searchmovies = await data.json();
    setSearchedMovies(searchmovies.results);
    setLoading(false);
  }

  const fetchGenre = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=${language}`
    );
    const gen = await data.json();
    setGenres(gen.genres);
  }

  const fetchTrending = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&page=${page}`
    );
    const trend = await data.json();
    setTrending(trending.concat(trend.results));
    setTotalPage(trend.total_pages);
    setLoading(false);
  }

  const fetchUpcoming = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=${language}&page=${page}`
    );
    const upc = await data.json();
    setUpcoming(upcoming.concat(upc.results));
    setTotalPage(upc.total_pages);
    setLoading(false);
  }

  const fetchTopRated = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=${language}&page=${page}`
    );
    const upc = await data.json();
    setTopRated(upcoming.concat(upc.results));
    setTotalPage(upc.total_pages);
    setLoading(false);
  }

  // creat local storage
  const GetFavorite = () => {
    setLoading(false);
  }

  const contextValue = {
    isAuthenticated, setIsAuthenticated,
    email, setEmail,
    password, setPassword,
    loginUser, logoutUser,

    genres, fetchGenre,
    setGenres,
    filteredGenre,
    movies, setMovies,
    page, setPage,
    activegenre, setActiveGenre,
    loading, setLoading,
    backgenre, setBackGenre,
    trending, fetchTrending,
    upcoming, fetchUpcoming,
    topRated, fetchTopRated,
    GetFavorite,
    totalPage,
    searchedMovies, fetchSearch,
    language, setLanguage,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, MovieProvider };