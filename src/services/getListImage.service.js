import API_CONFIG from '../constants/api-config';
import apiClient from '../utils/request';

export function getImageList(functionName,constructionDetailDTO) {
    return apiClient.post(API_CONFIG.REDIRECT_FUN, {functionName,constructionDetailDTO},{ headers: {
      'Accept-Language':language
     }});
  } 
