import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image185 } from '../api/moviedb';
import { styles } from '../theme';

const { width, height } = Dimensions.get('window');

export default function MovieList({ title, hideSeeAll, data }) {
    const navigation = useNavigation();

    return (
        <View style={{ marginBottom: 8 }}>
            <View style={{ margin: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 20 }}>{title}</Text>
                {!hideSeeAll && (
                    <TouchableOpacity>
                        <Text style={[styles.text, { fontSize: 20 }]}>See All</Text>
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {data.map((item, index) => (
                    <TouchableWithoutFeedback
                        key={index}
                        onPress={() => navigation.push('Movie', item)}
                    >
                        <View style={{ marginRight: 4, marginBottom: 4 }}>
                            <Image
                                source={{ uri: image185(item.poster_path) || fallbackMoviePoster }}
                                style={{ width: width * 0.33, height: height * 0.22, borderRadius: 20 }}
                            />
                            <Text style={{ color: 'gray', marginLeft: 2 }}>
                                {item.title.length > 14 ? `${item.title.slice(0, 14)}...` : item.title}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </ScrollView>
        </View>
    );
}