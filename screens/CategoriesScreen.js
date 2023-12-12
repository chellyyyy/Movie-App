// CategoriesScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { fetchCategoryMovies } from '../api/moviedb';

const CategoriesScreen = ({ category }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchCategoryMovies(category);
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching category movies:', error);
      }
    };

    fetchMovies();
  }, [category]);

  // Render your component with the fetched movies
  return (
    <View>
      <Text>{category} Movies</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text style={{color: 'white'}}>{item.title}</Text>
            {/* Render other movie details as needed */}
          </View>
        )}
      />
    </View>
  );
};

export default CategoriesScreen;