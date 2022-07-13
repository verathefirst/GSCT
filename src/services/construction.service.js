import API_CONFIG from '../constants/api-config';
import apiClient from '../utils/request';

export function fetchConstructionStatus(functionName,language) {
  return apiClient.post(API_CONFIG.REDIRECT_FUN, {functionName},{ headers: {
    'Accept-Language':language
   }});
}
export function searchConstruction(functionName,constructionDTO,language) {
  return apiClient.post(API_CONFIG.REDIRECT_FUN, {functionName,constructionDTO},{ headers: {
    'Accept-Language':language
   }});
}
export function constructionDetail(functionName,constructionDTO,language) {
  return apiClient.post(API_CONFIG.REDIRECT_FUN, {functionName,constructionDTO},{ headers: {
    'Accept-Language':language
   }});
}
