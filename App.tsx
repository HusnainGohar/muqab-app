/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as AntDesignProvider } from '@ant-design/react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Routes } from './src/routes';
import { persistor, store } from './src/store';
import { Platform, StatusBar } from 'react-native';
import { colors } from './src/utils/constants';

function App(): JSX.Element {
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor(colors.transparet);
      StatusBar.setBarStyle('dark-content');
    }
  }, []);

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
