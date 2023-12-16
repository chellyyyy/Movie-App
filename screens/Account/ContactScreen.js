import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from '../../components/header';
import { theme } from '../../theme';

const ContactScreen = () => {
    return (
        <View style={styles.container}>
            <Header title="Contact" hideSearch={true} />
            <View style={styles.content}>
                <Text style={styles.heading}>Contact Information</Text>
                <Text style={styles.text}>If you have any questions or feedback regarding the Movit app, feel free to contact us:</Text>
                <Text style={styles.text}>Email: support@movitapp.com</Text>
                <Text style={styles.text}>Phone: +123 456 7890</Text>
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

export default ContactScreen;