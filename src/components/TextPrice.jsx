import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../constants/theme.js';
import NumberFormat from 'react-number-format';
import CText from './Text.jsx';

export default function TextPrice({ value, style, fontSize, color }) {
  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;
  return (
    <NumberFormat
      value={value}
      displayType="text"
      thousandSeparator={true}
      suffix="₫"
      renderText={(result) => (
        <CText
          type="bold"
          size="medium"
          color={color || colors.primary}
          style={[styles.priceText, passedStyles, { fontSize }]}
        >
          {result}
        </CText>
      )}
    />
  );
}

const styles = StyleSheet.create({
  priceText: {
    color: colors.primary,
  },
});
