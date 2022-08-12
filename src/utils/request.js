import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_CONFIG from '../constants/api-config';
import configureStore from '../store';
const { store } = configureStore();

import authActions from '../store/actions/auth.action.js';

const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers:{
    'Content-Type':'application/json',
    'Accept-Language':'vi',
    'User-name': 'cms',
    'Password': 'cf2dc3f8ad8ddaca8352aa815c239c6d0efb145aa95a39cf7654c0c439e3a989'
  }
});

apiClient.interceptors.request.use(
  async (config) => {
    //console.log('=========Starting Request', JSON.stringify(config, null, 2))
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    throw error;
  },
);

apiClient.interceptors.response.use(
  async (response) => {
    //console.log('==========Response:', JSON.stringify(response, null, 2))
    return response.data;
  },
  async (error) => {
    //console.log('==========Response:', JSON.stringify(error, null, 2))
    if (error.response.status === 401) {
      store.dispatch(authActions.expiredToken('Phiên đăng nhập đã hết hạn'));
    } else {
      throw error;
    }
  },
);

export default apiClient;
