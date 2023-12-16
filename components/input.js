import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

const InputProfile = ({ title, value, onChangeText }) => {
    return (
        <View>
            <Text style={styles.heading}>{title}:</Text>
            <View style={styles.content}>
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                />
            </View>
        </View>
    );
};

const InputPassword = ({ title, value, onChangeText }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View>
            <Text style={styles.heading}>{title}:</Text>
            <View style={styles.content}>
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color={theme.grayColor} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const InputInfomation = ({ title, value, onChangeText, hideIcon }) => {
    const [showPassword, setShowPassword] = useState(true);

    return (
        <View>
            <Text style={styles.heading}>{title}:</Text>
            <View style={styles.content}>
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={!showPassword}
                />
                {hideIcon && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color={theme.grayColor} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        borderWidth: 1,
        borderColor: theme.grayColor,
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        color: 'white',
        textTransform: 'capitalize',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: 'white',
    },
});

// export default InputInfomation;
export { InputProfile, InputPassword };