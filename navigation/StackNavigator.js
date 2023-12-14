import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from '../theme';

import BottomTab from './BottomTab';
import ListScreen from '../screens/ListScreen';
import DetailScreen from '../screens/DetailScreen';
import VideoScreen from '../screens/VideoScreen';
import SearchScreen from '../screens/SearchScreen';
import PersonScreen from '../screens/PersonScreen';

import LanguagesScreen from '../screens/Settings/LanguagesScreen';
import UseScreen from '../screens/Settings/UseScreen';
import PrivacyScreen from '../screens/Settings/PrivacyScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={BottomTab} options={{ headerShown: false }} />
            <Stack.Screen name="List" component={ListScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Video" component={VideoScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Person" component={PersonScreen} options={{ headerShown: false }} />

            {/* Settings */}
            <Stack.Screen name="Languages" component={LanguagesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Use" component={UseScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default StackNavigator;