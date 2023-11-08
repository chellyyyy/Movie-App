import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import PremiumScreen from './screens/PremiumScreen';
import DetailScreen from './screens/DetailScreen';
import AccountScreen from './screens/AccountScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabIcon = ({ name, focused }) => {
  return (
    <Icons name={name} size={25}
      color={focused ? '#4390f7' : '#000'}
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
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} options={{headerShown:false}} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStack}
          options={homeScreenOptions(true, 'home')} />
        <Tab.Screen name="Premium" component={PremiumScreen}
          options={homeScreenOptions(true, 'star')} />
        <Tab.Screen name="Account" component={AccountScreen}
          options={homeScreenOptions(true, 'person')} />
        {/* <Tab.Screen name="Detail" component={DetailScreen} /> */}
        {/* Thêm các màn hình và tab khác tại đây */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}