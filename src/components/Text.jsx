import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors } from '../constants/theme.js';

const SIZE_TYPE = {
  TINY: 'tiny',
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

export default function CText({ children, type, style, size, color, label }) {
  let textStyle = {};
  switch (type) {
    case 'regular':
      textStyle = styles.regular;
      break;
    case 'bold':
      textStyle = styles.bold;
      break;
    case 'light':
      textStyle = styles.light;
      break;
    default:
      textStyle = styles.regular;
      break;
  }

  const textSize = {
    fontSize: 14,
  };

  if (Number.isInteger(size)) {
    textSize.fontSize = size;
  } else {
    switch (size) {
      case SIZE_TYPE.TINY:
        textSize.fontSize = 14;
        break;
      case SIZE_TYPE.SMALL:
        textSize.fontSize = 16;
        break;
      case SIZE_TYPE.MEDIUM:
        textSize.fontSize = 20;
        break;
      case SIZE_TYPE.LARGE:
        textSize.fontSize = 24;
        break;
      default:
        textSize.fontSize = 14;
        break;
    }
  }

  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return (
    <Text
      style={{
        ...textStyle,
        color: color || colors.black,
        ...textSize,
        ...passedStyles,
      }}
    >
      {label || children}
    </Text>
  );
}

const styles = StyleSheet.create({
  regular: {
    fontFamily: 'HelveticaNeue',
    fontSize: 14,
    fontWeight: '600',
  },
  bold: {
    fontFamily: 'HelveticaNeue-Bold',
    fontWeight: 'bold',
    fontSize: 14,
  },
  light: {
    fontFamily: 'HelveticaNeue',
    fontWeight: '500',
    fontSize: 14,
  },
});
