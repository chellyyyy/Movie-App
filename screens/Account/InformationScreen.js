import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from '../../components/header';
import { theme } from '../../theme';

const InformationScreen = () => {
    return (
        <View style={styles.container}>
            <Header title="Information" hideSearch={true} />
            <View style={styles.content}>
                <Text style={styles.heading}>About Movit</Text>
                <Text style={styles.text}>
                    Movit is your go-to app for discovering and enjoying a wide range of movies. Our mission is to provide a seamless and enjoyable experience for movie enthusiasts.
                </Text>

                <Text style={styles.heading}>Features</Text>
                <Text style={styles.text}>
                    - Browse and search for your favorite movies.
                </Text>
                <Text style={styles.text}>
                    - Create personal lists and keep track of your watch history.
                </Text>
                <Text style={styles.text}>
                    - Stay up-to-date with the latest releases and trends.
                </Text>

                {/* You can add more information about the app's features, team, or anything else */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    content: {
        padding: 16,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        color: 'white',
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
        color: 'white',
        textAlign: 'justify',
    },
});

export default InformationScreen;