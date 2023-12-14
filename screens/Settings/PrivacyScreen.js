import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from '../../components/header';
import { theme } from '../../theme';

const PrivacyScreen = () => {
    return (
        <View style={styles.container}>
            <Header title="Privacy Policy" hideSearch={true} />
            <View style={styles.content}>
                <Text style={styles.heading}>1. Information We Collect</Text>
                <Text style={styles.text}>
                    We may collect information that you provide to us directly, such as your name, email address, and other personal information when you use our app.
                </Text>

                <Text style={styles.heading}>2. How We Use Your Information</Text>
                <Text style={styles.text}>
                    We use the information we collect to provide and improve our services, personalize your experience, and send you updates and promotional messages.
                </Text>

                <Text style={styles.heading}>3. Data Security</Text>
                <Text style={styles.text}>
                    We take reasonable measures to protect your personal information from unauthorized access or disclosure.
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

export default PrivacyScreen;