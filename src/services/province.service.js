import API_CONFIG from '../constants/api-config';
import apiClient from '../utils/request';

export function fetchProvince(functionName) {
  return apiClient.post(API_CONFIG.REDIRECT_FUN, {functionName});
}