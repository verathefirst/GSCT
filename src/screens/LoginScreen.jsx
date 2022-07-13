import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  styles,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Modal, FlatList
} from 'react-native';
import { colors, fonts, sizes } from '../constants/theme';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../services/auth.service.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import CText from '../components/Text.jsx';
import SizedBox from '../components/SizedBox.jsx';
import icons from '../constants/icons.js';
import authActions from '../store/actions/auth.action.js';
import TopNavigation from '../components/TopNavigation.jsx';
import { ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Feather.js';
import Divider from '../components/Divider.jsx';
import { TYPES } from '../store/types';

function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const { flag, listLang, language, languageName, languageCode} = useSelector((state) => state.langState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [modal, setModal] = useState(false);
  const [password, setPassword] = useState('');
  // const [flag, setFlag] = useState('');

  const [visiblePassword, setVisiblePassword] = useState(false);
  const a = 'loginAuthentication';
  const onLoginPressed = async () => {
    try {
      setLoading(true);
      const output = await userLogin(a, username, password,languageCode);
      if (output.description) {

        setError(output.description);
      } else {
        await AsyncStorage.setItem('token', output.data.token);
        dispatch(authActions.loginSuccess(output.data.token));
        navigation.navigate('Authenticated');
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={style.layout}
    >
      <ImageBackground source={require('../assets/images/bg.jpg')} resizeMode="stretch" style={{ flex: 1, justifyContent: 'center' }}>
        <View style={style.container} >
          <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => setModal(true)}>
              <CText
                style={{ textAlign: 'center', paddingRight: 5 }}
                size={14}
                type='bold'
                color={colors.red}
                label={languageName}
              />
              <Image
                source={flag}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex:1, justifyContent:'center'}}>
            <SizedBox height={sizes.padding * 3} />
            <View style={style.input}>
              <Input
                leftAction={
                  <Image
                    source={icons.fi_user}
                    style={{ width: 25, height: 25, tintColor: colors.black }}
                  />
                }
                placeholder={language.ACCOUNT}
                onChangeText={setUsername}
                value={username}
              />
            </View>
            <SizedBox height={sizes.padding * 2} />
            <View style={style.input}>
              <Input
                leftAction={
                  <Image
                    source={icons.padlock}
                    style={{ width: 25, height: 25, tintColor: colors.black }}
                  />
                }
                isSecure={!visiblePassword}
                value={password}
                onChangeText={setPassword}
                rightAction={
                  <TouchableOpacity
                    style={style.showPassword}
                    onPress={() => {
                      setVisiblePassword(!visiblePassword);
                    }}
                  >
                    <Image
                      source={visiblePassword ? icons.show : icons.hide}
                      style={{
                        width: 25,
                        height: 25,
                        tintColor: colors.black,
                      }}
                    />
                  </TouchableOpacity>
                }
                placeholder='******'
              />
            </View>
            <SizedBox height={sizes.padding * 2} />
            {error ? (
              <CText
                style={{ textAlign: 'center' }}
                size={16}
                type='bold'
                color={colors.blue}
                label={error}
              />
            ) : null}
            <SizedBox height={sizes.padding * 2} />
            <Button
              onPress={onLoginPressed}
              loading={loading}
              label={language.LOGIN}
              color={colors.white}
              backgroundColor={colors.blue}
            />
          </View>
        </View>
        <Modal animationType='slide' transparent={true} visible={modal}>
          <View style={style.modalContainer}>
            <View style={style.modalWrap}>
              <View style={style.modalHeader}>
                <CText size='small' style={{ fontSize: 18 }} type='bold'>
                  {language.LANGUAGE}
                </CText>
                <TouchableOpacity
                  onPress={() => setModal(false)}
                >
                  <Icon name='x' size={30} color={colors.red} />
                </TouchableOpacity>
              </View>
              <Divider style={{ marginHorizontal: sizes.padding }} />
              <FlatList
                contentContainerStyle={{
                  marginHorizontal: sizes.padding,
                }}
                data={listLang}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.6}
                      style={style.itemContain}
                      onPress={() => {
                        setModal(false);
                        dispatch({
                          type: TYPES.SET_LANGUAGE,
                          payload: item.code,
                        });
                      }}
                    >
                      <SizedBox height={8} />
                      <CText numberOfLines={4} size={15}>
                        {item.name}
                      </CText>
                      <SizedBox height={4} />
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        </Modal>
      </ImageBackground>

    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  layout: { flex: 1 },
  title: {
    ...fonts.body3,
    fontWeight: '500',
    marginTop: sizes.base * 2,
  },
  container: {
    flex: 1,
    paddingHorizontal: sizes.padding * 2,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  showPassword: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalWrap: {
    width: sizes.width * 0.9,
    height: sizes.height * 0.5,
    backgroundColor: colors.white,
    borderRadius: sizes.radius / 1.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: sizes.padding,
    alignItems: 'center',
  },
  itemContain: {
    marginVertical: sizes.base,
    width: sizes.width,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: sizes.width / 4,
  },
  input: {
    height: sizes.height / 12
  }
});

export default LoginScreen;