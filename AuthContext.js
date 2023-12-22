import React, { createContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { apiKey } from './api/moviedb';

const AuthContext = createContext();

const MovieProvider = ({ children }) => {
  const navigation = useNavigation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [realName, setRealname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [user, updateUser] = useState('');
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
  const [laterList, setLaterlist] = useState('');
  const [watchLater, setWatchLater] = useState([]);

  useEffect(() => {
    if (page < 1) {
      setPage(1)
    }
  }, [page]);

  const handleLogin = async () => {
    try {
        const response = await fetch('http://10.0.2.2:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data.message);
            setIsAuthenticated(true);
        } else {
            console.error(data.message);
            if (response.status === 401) {
                // Handle invalid username or password
                // For example, show an error message to the user
                console.error('Invalid username or password');
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
  };


  const handleRegister = async () => {

    try {
      if (!username || !realName || !email || !password || password !== confirmPassword) {
        console.error('Invalid input. Please check your information.');
        return;
      }

      const response = await fetch('http://10.0.2.2:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          realName,
          email,
          password,
        }),
      });

      const data = await response.json();
      

      if (response.ok) {
        console.log(data.message);
        navigation.navigate('Login');
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // const loginUser = (enteredEmail, enteredPassword) => {
  //   if (enteredEmail === 'A' && enteredPassword === 'A') {
  //     setIsAuthenticated(true);
  //   } else {
  //     setIsAuthenticated(false);
  //     Alert.alert("Incorrect email or password.");
  //   }
  // };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const getWatchLater = async (username) => {
    try {
      const response = await fetch('http://10.0.2.2:5000/api/get_watchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error('Unable to fetch watchlist');
      }
  
      const data = await response.json();
      const watchlist = data.watchlist;
  
      console.log('Watchlist:', watchlist);
  
      setWatchLater(watchlist);
    } catch (error) {
      console.error('Error fetching watchlist:', error.message);
      throw error;
    }
  };


  // Movies ============================================================================
  
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
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=${language}&query=${query}&page=${page}&include_adult=false`
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

    //thong tin user
    username, setUsername,
    realName, setRealname,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,   
    age, setAge,
    address, setAddress,
    handleLogin, handleRegister, handleLogout,
    user, updateUser,
    //thong tin phim
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
    laterList, setLaterlist,
    watchLater, setWatchLater,
    getWatchLater,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, MovieProvider };