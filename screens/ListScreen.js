import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import MoviePreview from '../components/moviePreview';
import { Mainstyles, Buttonstyles, theme } from '../theme';

const ListScreen = ({ route }) => {
    const { title, data } = route.params;
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.subBackground }]}>
                <TouchableOpacity style={[Buttonstyles.background, { borderRadius: 10, padding: 1, marginLeft: 16 }]} onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon width={28} height={28} color="white" />
                </TouchableOpacity>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        {title} <Text style={Mainstyles.text}>M</Text>ovies
                    </Text>
                </View>
            </SafeAreaView>
            <MoviePreview results={data} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 10,
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
});

export default ListScreen;