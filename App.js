import React, { useContext } from 'react';
import { AuthProvider } from './Contextpage';
import AppNavigator from './navigation/AppNavigator';

const App = () => {

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;