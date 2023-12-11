import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icons from 'react-native-vector-icons/Ionicons';
import { theme } from '../theme';

import HomeStack from './HomeStack';
import PremiumScreen from '../screens/PremiumScreen';
import AccountScreen from '../screens/AccountScreen';

const Bottom = createBottomTabNavigator();

const TabIcon = ({ name, focused }) => {
    return (
        <Icons name={name} size={25}
            color={focused ? theme.background : 'white'}
        />
    );
};

const homeScreenOptions = (headerShown, name) => {
    return {
        headerShown: headerShown,
        headerStyle: {
            backgroundColor: theme.subBackground,
        },
        headerTintColor: 'white',
        tabBarIcon: ({ focused }) => <TabIcon name={name} focused={focused} />,
    };
};

const BottomTab = () => {
    return (
        <Bottom.Navigator
            screenOptions={{
                tabBarActiveBackgroundColor: theme.mainColor,
                tabBarInactiveBackgroundColor: theme.background,
                tabBarLabelStyle: { fontSize: 13 },
            }}
            tabBarOptions={{
                activeTintColor: theme.background,
                inactiveTintColor: 'white',
                style: {
                    backgroundColor: theme.background,
                },
            }}
        >
            <Bottom.Screen name="Home" component={HomeStack}
                options={homeScreenOptions(false, 'home')} />
            <Bottom.Screen name="Premium" component={PremiumScreen}
                options={homeScreenOptions(true, 'star')} />
            <Bottom.Screen name="Account" component={AccountScreen}
                options={homeScreenOptions(true, 'person')} />
        </Bottom.Navigator>
    );
};

export default BottomTab;