import { StyleSheet, View } from 'react-native';
import CText from './Text.jsx';
import { colors, sizes } from '../constants/theme.js';
import TextPrice from './TextPrice.jsx';
import React from 'react';

const OrderRow = ({ label, value, type, color }) => {
  return (
    <View style={styles.orderRowContainer}>
      <CText type="bold" size={14} color={colors.gray}>
        {label}
      </CText>
      {type === 'price' ? (
        <TextPrice value={parseInt(value)} fontSize={16} />
      ) : (
        <CText type="bold" size={14} color={color}>
          {value}
        </CText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderRowContainer: {
    marginVertical: sizes.base / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default OrderRow;
