import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../constants/theme.js';
import CText from './Text.jsx';
import LoadingIndicator from './LoadingIndicator.jsx';

const BUTTON_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

export default function Button({
  label,
  disabled,
  loading,
  onPress,
  size,
  style,
  shadow,
  backgroundColor,
  color,
}) {
  if (!backgroundColor) {
    backgroundColor = colors.primary;
  }

  let height;
  switch (size) {
    case BUTTON_SIZES.SMALL:
      height = 50;
      break;
    case BUTTON_SIZES.MEDIUM:
      height = 60;
      break;
    case BUTTON_SIZES.LARGE:
      height = 70;
      break;
    default:
      height = 50;
      break;
  }

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        height,
        ...style,
        backgroundColor,
        ...(shadow && styles.shadow),
      }}
      activeOpacity={0.6}
      onPress={onPress}
      disabled={disabled}
    >
      {loading ? (
        <LoadingIndicator color={color || colors.white} size={25} />
      ) : (
        <CText type='bold' size={16} color={color || colors.white}>
          {label}
        </CText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  shadow: {
    shadowColor: colors.primary,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.32,
    shadowRadius: 100,
    elevation: 9,
  },
});
