import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { Provider } from 'react-redux';
import { store } from './src/store';
import Main from './src';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <Main />
    </Provider>
  );
};

export default App;
