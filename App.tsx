/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as AntDesignProvider } from '@ant-design/react-native';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { Routes } from './src/routes';
import { persistor, store } from './src/store';

function App(): JSX.Element {

  return (
    <AntDesignProvider>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
      </PersistGate>
      </Provider>
    </AntDesignProvider>
  );
}

export default App;
