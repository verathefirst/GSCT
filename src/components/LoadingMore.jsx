import { colors, sizes } from '../constants/theme.js';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import React from 'react';

export default function LoadingMore() {
  return (
    <View style={style.container}>
      <ActivityIndicator color={colors.primary} size={25} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginVertical: sizes.padding,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
