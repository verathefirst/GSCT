import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { colors, sizes } from '../constants/theme';

export default function Input({
  keyboardType,
  style,
  value,
  onChangeText,
  placeholder,
  isSecure = false,
  leftAction,
  rightAction,
  inputStyle,
  onBlur,
  editable,
  placeholderTextColor
}) {
  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return (
    <View style={[styles.inputContainer, { ...passedStyles }]}>
      {leftAction && <View style={{ marginRight: 10 }}>{leftAction}</View>}
      <TextInput
        onBlur={onBlur}
        keyboardType={keyboardType}
        placeholder={placeholder}
        style={[styles.input, { flex: 1 }, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
        placeholderStyle={{...styles.input, color: colors.black}}
        editable={editable}
        placeholderTextColor={placeholderTextColor}
      />
      {rightAction && <View style={{ marginLeft: 10 }}>{rightAction}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    height: 50,
    paddingHorizontal: sizes.base * 2,
    backgroundColor: colors.lightGray,
    borderRadius: 30,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontFamily: 'HelveticaNeue-Medium',
    fontWeight: '500',
    color: colors.black,
    fontSize: 18,
  },
});
