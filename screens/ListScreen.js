import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import MoviePreview from '../components/moviePreview';
import CastPreview from '../components/castPreview';
import { Header } from '../components/header';
import { AuthContext } from '../AuthContext';
import { Mainstyles, Buttonstyles, theme } from '../theme';

const ListScreen = ({ route }) => {
    const { title, data, isCast, isClear } = route.params;
    const navigation = useNavigation();
    const { language } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Header title={title} />
            {data.length > 0 ? (
                <>
                    {isClear && (
                        <View style={{alignItems: 'flex-end'}} >
                            <TouchableOpacity onPress={() => alert('Simple Button pressed')} >
                                <Text style={styles.ClearButton}>{language === 'vi' ? "XÓA" : "CLEAR"}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {isCast ? (
                        <CastPreview results={data} />
                    ) : (
                        <MoviePreview results={data} />
                    )}
                </>
            ) : (
                <Text style={styles.text}>{title} {language === 'vi' ? "đang trống" : "is empty"}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        paddingVertical: 10,
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
    text: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 30,
    },
    // text: {
    //     ...StyleSheet,
    // },
    ClearButton: {
        fontSize: 20,
        // fontWeight: 'bold',
        marginHorizontal: 15,
        marginVertical: 10,
        color: 'white',
        // textDecorationLine: 'underline',
        fontStyle: 'italic',
        textTransform: 'capitalize',
    },
});

export default ListScreen;