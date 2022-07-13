import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const colors = {
  primary: '#00A3ED',
  secondary: '#42D6ED',
  primaryLight: '#0062DB',

  blue: '#00A3ED',
  lightblue: 'rgba(46,92,255,0.2)',

  green: '#00A3ED',
  lightGreen: '#E6FEF0',

  lime: '#00BA63',
  emerald: '#2BC978',

  red: '#FF4134',
  lightRed: '#FFF1F0',

  purple: '#6B3CE9',
  lightpurple: '#F3EFFF',

  yellow: '#FFC664',
  lightyellow: '#FFF9EC',

  black: '#001833',
  white: '#FFFFFF',

  lightGray: '#F7F8FB',
  gray: '#a5acaf',
  darkgray: '#646769',
  
  light: '#F1F1F1',
  dark: '#000',
  transparent: 'transparent',
};

const sizes = {
  // global sizes
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  // src dimensions
  width,
  height,
};

const fonts = {
  largeTitle: {
    fontFamily: 'HelveticaNeue',
    fontSize: sizes.largeTitle,
    lineHeight: 55,
  },
  h1: { fontFamily: 'HelveticaNeue', fontSize: sizes.h1, lineHeight: 36 },
  h2: { fontFamily: 'HelveticaNeue-Bold', fontSize: sizes.h2, lineHeight: 30 },
  h3: { fontFamily: 'HelveticaNeue-Bold', fontSize: sizes.h3, lineHeight: 22 },
  h4: { fontFamily: 'HelveticaNeue-Bold', fontSize: sizes.h4, lineHeight: 22 },
  body1: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: sizes.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: sizes.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: sizes.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: sizes.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: sizes.body5,
    lineHeight: 22,
  },
};

export { colors, sizes, fonts };
