import { colors, sizes } from '../constants/theme.js';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import React from 'react';

export default function LoadingIndicator({ size, color }) {
  return (
    <View style={style.container}>
      <ActivityIndicator
        color={color || colors.primary}
        size={size || 'small'}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    // marginVertical: sizes.padding,
    justifyContent: 'center',
    alignItems: 'center',
    height:20
  },
});
