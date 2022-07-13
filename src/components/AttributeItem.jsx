import { colors, sizes } from '../constants/theme.js';
import CText from './Text.jsx';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Input from './Input.jsx';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather.js';

export default function AttributeItem({
  item,
  index,
  addPress,
  removePress,
  inputChange,
}) {
  const isZero = parseInt(item.numberOfPocket) <= 0;
  return (
    <View key={item.colorName} style={styles.wrap}>
      <CText style={styles.colorName} type='bold' size={16}>
        {item.colorName}
      </CText>
      <View style={styles.rootInput}>
        <Input
          keyboardType='numeric'
          value={item.numberOfPocket}
          onChangeText={(value) => inputChange('input', index, value)}
          inputStyle={styles.inputStyle}
          style={styles.inputWrap}
          onBlur={() => {
            if (item.numberOfPocket === ''||item.numberOfPocket <=0) {
              inputChange('input', index, '0');
            }
          }}
          leftAction={
            <TouchableOpacity
              disabled={isZero}
              style={[
                styles.actionIcon,
                { backgroundColor: isZero ? colors.darkgray : colors.primary },
              ]}
              onPress={() => removePress('remove', index)}
            >
              <Icon name='minus' color={colors.white} size={15} />
            </TouchableOpacity>
          }
          rightAction={
            <TouchableOpacity
              style={styles.actionIcon}
              onPress={() => addPress('add', index)}
            >
              <Icon name='plus' color={colors.white} size={15} />
            </TouchableOpacity>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: sizes.padding,
  },
  rootInput: { width: 140, height: 35 },
  inputStyle: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 14,
  },
  colorName: {
    opacity: 0.7,
  },
  inputWrap: {
    paddingHorizontal: 5,
    height: 35,
  },
  actionIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    width: 30,
    height: 30,
    backgroundColor: colors.primary,
  },
});
