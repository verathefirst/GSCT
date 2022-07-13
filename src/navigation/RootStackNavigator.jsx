import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  CustomerScreen,
  EditCartItemScreen,
  OrderCancelScreen,
  OrderDetailScreen,
  OrderListScreen,
  ProductScreen,
  SuccessScreen,
  AddCustomerScreen,
  UpdateCustomerScreen,
  DetailConstructionScreen
} from '../screens';
import { useSelector } from 'react-redux';
import MainStackNavigator from './MainStackNavigator.jsx';
import AuthStackNavigator from './AuthStackNavigator.jsx';
import NavigationService from '../services/navigation.service.js';
import SplashScreen from 'react-native-splash-screen';

const RootStack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: 'transparent',
  },
};

export default function RootStackNavigator() {
//   useEffect(() => {
//     SplashScreen.hide();
//   }, []);
  const { isLoggedIn } = useSelector((state) => state.authState);
  // console.log(isLoggedIn);
  return (
    <NavigationContainer
      theme={theme}
      ref={(navigationRef) =>
        NavigationService.setTopLevelNavigator(navigationRef)
      }
    >
      <RootStack.Navigator screenOptions={{
          headerShown: false
        }}>
        { isLoggedIn ? (
          <>
            <RootStack.Screen
              name="Authenticated"
              component={MainStackNavigator}
            />
            <RootStack.Screen
              name="DetailConstructionScreen"
              component={DetailConstructionScreen}
            />
          </>
        ) : (
          <RootStack.Screen
            name="Unauthenticated"
            component={AuthStackNavigator}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
