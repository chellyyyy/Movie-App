import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import IonIcon from 'react-native-vector-icons/Ionicons';

import AccountScreen from '../screens/AccountScreen';

const Drawer = createDrawerNavigator();

const TabIcon = ({ name, focused }) => {
    return (
      <IonIcon name={name} size={25}
        color={focused ? '#4390f7' : '#000'}
      />
    );
  };

const profieScreenOptions = (headerShown, name) => {
  return {
    headerShown: headerShown,
    drawerIcon: ({ focused }) => <TabIcon name={name} focused={focused} />,
  };
};

export default function ProfieDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Account">
        <Drawer.Screen name="Account" component={AccountScreen}
            options={profieScreenOptions(false, 'home-outline')}
        />
    </Drawer.Navigator>
  );
}