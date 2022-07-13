import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { colors } from '../constants/theme.js';

const Container = ({ children, center, style }) => {
  let passedStyle = {};

  if (center) {
    passedStyle = {
      ...passedStyle,
      justifyContent: 'center',
      alignItems: 'center',
      flex: null,
    };
  }

  return (
    <SafeAreaView style={[styles.container, passedStyle, style]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default Container;
