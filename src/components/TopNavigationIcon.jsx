import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../constants/theme.js';
import Icon from 'react-native-vector-icons/Feather';

export default function TopNavigationIcon({ style, onPress, color, icon }) {
  return (
    <TouchableOpacity style={[styles.iconContainer, style]} onPress={onPress}>
      <Icon name={icon} size={25} color={color || colors.black} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    borderRadius: 25,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
  },
});
