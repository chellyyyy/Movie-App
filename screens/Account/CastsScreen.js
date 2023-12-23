import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import CastPreview from '../../components/castPreview';
import { Header } from '../../components/header';
import { Mainstyles, Buttonstyles, theme } from '../../theme';

const CastsScreen = ({ route }) => {
    const { title, data } = route.params;
    // const { title, cast } = route.params;
    const navigation = useNavigation();
    // console.log(data)
    return (
        <View style={styles.container}>
            <Header title={title} />
            {data.length > 0 ? (
                <CastPreview results={data} />
            ) : (
                <Text style={styles.text}>{title} is empty</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default CastsScreen;