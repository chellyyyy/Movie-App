import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../api/moviedb';

const { width, height } = Dimensions.get('window');

export default function TrendingMovies({ data }) {
    const navigation = useNavigation();

    const handleClick = (item) => {
        navigation.navigate('Movie', item);
    };

    return (
        <View style={{ marginBottom: 8 }}>
            <Text style={{ color: 'white', fontSize: 20, margin: 4, marginBottom: 5 }}>
                Trending
            </Text>
            <Carousel
                data={data}
                renderItem={({ item }) => <MovieCard handleClick={handleClick} item={item} />}
                firstItem={1}
                // loop={true}
                // inactiveSlideScale={0.86}
                inactiveSlideOpacity={0.6}
                sliderWidth={width}
                itemWidth={width * 0.62}
                slideStyle={{ display: 'flex', alignItems: 'center' }}
            />
        </View>
    );
}

const MovieCard = ({ item, handleClick }) => {
    return (
        <TouchableOpacity onPress={() => handleClick(item)}>
            <Image
                source={{ uri: image500(item.poster_path) }}
                style={{
                    width: width * 0.6,
                    height: height * 0.4,
                    borderRadius: 20,
                }}
            />
        </TouchableOpacity>
    );
}