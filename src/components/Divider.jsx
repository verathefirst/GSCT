import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../constants/theme.js';

const Divider = ({ style }) => {
  return <View style={[styles.divider, style]} />;
};

const styles = StyleSheet.create({
  divider: {
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
  },
});

export default Divider;
