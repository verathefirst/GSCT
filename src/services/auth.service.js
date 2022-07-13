import API_CONFIG from '../constants/api-config';
import apiClient from '../utils/request';

export function userLogin(functionName, userName, password, language) {
  return apiClient.post(API_CONFIG.LOGIN, { functionName,userName, password }, { headers: {
    'Accept-Language':language
   }});
}
