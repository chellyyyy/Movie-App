import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import Cast from '../../components/cast';
import { Header } from '../../components/header';
import { Mainstyles, Buttonstyles, theme } from '../../theme';

const CastsScreen = ({ route }) => {
    const { title } = route.params;
    // const { title, cast } = route.params;
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Header title={title} />
            <Text style={Mainstyles.text}>Casts Screen</Text>
            {/* <Cast navigation={navigation} /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default CastsScreen;