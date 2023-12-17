import React, { useContext } from 'react';
import { MovieProvider } from './AuthContext';
import AppNavigator from './navigation/AppNavigator';

const App = () => {

  return (
    <MovieProvider>
      <AppNavigator />
    </MovieProvider>
  );
};

export default App;