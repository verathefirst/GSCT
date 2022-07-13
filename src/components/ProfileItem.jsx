import React from 'react';
import { colors, fonts, sizes } from '../constants/theme.js';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather.js';

function ProfileItem({ icon, onPress, title }) {
  return (
    <TouchableOpacity style={style.container} onPress={onPress}>
      <View style={style.leftContainer}>
        <View style={style.leftIcon}>
          <Icon name={icon} size={25} color={colors.black} />
        </View>
        <Text style={style.text}>{title}</Text>
      </View>
      <Icon name='chevron-right' size={25} color={colors.black} />
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    paddingVertical: sizes.padding,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  leftContainer: { flexDirection: 'row', alignItems: 'center' },
  leftIcon: {
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
  },
  text: {
    ...fonts.h4,
    fontWeight: '500',
    color: colors.black,
    marginLeft: sizes.padding,
  },
});

export default ProfileItem;
