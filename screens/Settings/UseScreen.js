import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from '../../components/header';
import { theme } from '../../theme';

const UseScreen = () => {
    return (
        <View style={styles.container}>
            <Header title="Terms of Use" hideSearch={true} />
            <View style={styles.content}>
                <Text style={styles.text}>
                    Welcome to Movit, your go-to app for streaming movies. By using our app, you agree to comply with and be bound by the following terms and conditions:
                </Text>
                <Text style={styles.heading}>1. Acceptance of Terms</Text>
                <Text style={styles.text}>
                    By accessing or using Movit, you acknowledge that you have read, understood, and agree to be bound by these terms.
                </Text>
                <Text style={styles.heading}>2. User Accounts</Text>
                <Text style={styles.text}>
                    To use certain features of Movit, you may be required to create a user account. You are responsible for maintaining the confidentiality of your account information.
                </Text>
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

export default UseScreen;