import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icons from 'react-native-vector-icons/Ionicons';
import { theme } from './theme';

import HomeScreen from './screens/HomeScreen';
import PremiumScreen from './screens/PremiumScreen';
import DetailScreen from './screens/DetailScreen';
import AccountScreen from './screens/AccountScreen';
import SearchScreen from './screens/SearchScreen';
import PersonScreen from './screens/PersonScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabIcon = ({ name, focused }) => {
  return (
    <Icons name={name} size={25}
      color={focused ? theme.mainColor : '#000'}
    />
  );
};

const homeScreenOptions = (headerShown, name) => {
  return {
    headerShown: headerShown,
    tabBarIcon: ({ focused }) => <TabIcon name={name} focused={focused} />,
  };
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Search" options={{ headerShown: false }} component={SearchScreen} />
      <Stack.Screen name="Person" options={{ headerShown: false }} component={PersonScreen} />
    </Stack.Navigator>
  );
};

// Tạo một đối tượng theme mới dựa trên DefaultTheme và cập nhật màu nền
const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.background, // Màu nền của NavigationContainer
  },
};

export default function App() {
  return (
    <NavigationContainer theme={myTheme}>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: theme.mainColor,
          inactiveTintColor: 'black',
          style: {
            backgroundColor: theme.subBackground,
          },
        }}
      >
        <Tab.Screen name="Home" component={HomeStack}
          options={homeScreenOptions(false, 'home')} />
        <Tab.Screen name="Premium" component={PremiumScreen}
          options={homeScreenOptions(true, 'star')} />
        <Tab.Screen name="Account" component={AccountScreen}
          options={homeScreenOptions(true, 'person')} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}