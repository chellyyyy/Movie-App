import React from 'react';
import { View, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import { theme } from '../theme';

const { width, height } = Dimensions.get('window');

export default function Loading() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height, width, position: 'absolute' }}>
            <Progress.CircleSnail thickness={12} size={160} color={theme.background} />
        </View>
    );
}