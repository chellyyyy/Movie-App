import React from 'react';
import { View, Text } from 'react-native';

const DetailScreen = ({ route }) => {
  const { movie } = route.params;

  return (
    <View>
      <Text>{movie.title}</Text>
      <Text>Release Date: {movie.release_date}</Text>
    </View>
  );
};

export default DetailScreen;
