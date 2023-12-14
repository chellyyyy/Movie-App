import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { theme } from './theme';
import StackNavigator from './navigation/StackNavigator';

const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.background,
  },
};

export default function App() {
  return (
    <NavigationContainer theme={myTheme}>
      <StackNavigator />
    </NavigationContainer>
  );
}