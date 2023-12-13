import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { StatusBar } from 'expo-status-bar';
import { Mainstyles } from '../theme';

const Header = ({ title }) => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={[styles.safeArea, Mainstyles.headerBackground]}>
            <StatusBar style="light" />
            <View style={styles.header}>
                <Text style={styles.title}>
                    {title} <Text style={Mainstyles.mainText}>M</Text>ovit
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
});

export default Header;