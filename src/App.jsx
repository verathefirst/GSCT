import React from 'react';
import RootStackNavigator from './navigation/RootStackNavigator';
import { Provider } from 'react-redux';
import configureStore from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'react-native';

const { store, persistor } = configureStore();
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle="dark-content" />
        <RootStackNavigator />
      </PersistGate>
    </Provider>
  );
}
