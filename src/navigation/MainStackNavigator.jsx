import React from 'react';
import { StyleSheet } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {
  CartScreen,
  CustomerScreen,
  HomeScreen,
  ProfileScreen,
  AddCustomerScreen
} from '../screens';
import { colors } from '../constants/theme.js';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather.js';
import Icon1 from 'react-native-vector-icons/Ionicons.js';
const TabBar = createStackNavigator();

export default function MainStackNavigator() {
  // const { items } = useSelector((state) => state.cartState);
  return (
    <TabBar.Navigator
     screenOptions={{
      tabBarHideOnKeyboard: true,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.primary,
      headerShown: false
      }}
    >
      <TabBar.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Icon name='home' size={size} color={color} />
          ),
        }}
      />
    </TabBar.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
