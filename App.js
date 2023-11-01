import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen'; // Thay đổi đường dẫn nếu cần
import PremiumScreen from './screens/PremiumScreen'; // Thay đổi đường dẫn nếu cần
import DetailScreen from './screens/DetailScreen'; // Thay đổi đường dẫn nếu cần

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Premium" component={PremiumScreen} />
        {/* <Tab.Screen name="Detail" component={DetailScreen} /> */}
        {/* Thêm các màn hình và tab khác tại đây */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
