import { View } from 'react-native';
import { sizes } from '../constants/theme.js';
import React from 'react';

const Box = ({ children, style }) => {
  return (
    <View style={[{ marginHorizontal: sizes.padding * 2 }, style]}>
      {children}
    </View>
  );
};

export default Box;
