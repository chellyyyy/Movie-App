import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Header } from '../../components/header';
import { theme } from '../../theme';

const LanguagesScreen = () => {

    return (
        <View style={styles.container}>
            <Header title="Languages" hideSearch={true} />
            <CheckBox
                title='English'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={true}
                checkedColor={theme.mainColor}
                textStyle={{ color: 'white' }}
                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
            />
            {/* <CheckBox
                title='Vietname'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={false}
                checkedColor={theme.mainColor}
                textStyle={{ color: 'white' }}
                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default LanguagesScreen;