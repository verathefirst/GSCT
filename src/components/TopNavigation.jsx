import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../constants/theme.js';
import CText from './Text.jsx';

export default function TopNavigation({
  leftAction,
  rightAction,
  title,
  style,
  color
}) {
  let justifyContent;

  if (title && !leftAction && !rightAction) {
    justifyContent = 'center';
  } else {
    justifyContent = 'space-between';
  }

  return (
    <View style={[styles.container, { justifyContent: justifyContent }, style]}>
      {leftAction ? (
        leftAction
      ) : (
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: colors.white, opacity: 0 },
          ]}
        />
      )}
      {title ? <CText type='bold' size={18} label={title} color={color} /> : null}
      {rightAction ? (
        rightAction
      ) : (
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: colors.white, opacity: 0 },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
  },
  iconContainer: {
    borderRadius: 25,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
  },
});
