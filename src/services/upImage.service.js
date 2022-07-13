import API_CONFIG from '../constants/api-config';
import apiClient from '../utils/request';
import apiClientNoContentType from '../utils/sercondRequest';

export function uploadRequestConstruction(functionName, listConstructionDetail,language) {
  return apiClient.post(API_CONFIG.REDIRECT_FUN, { functionName, listConstructionDetail },{ headers: {
    'Accept-Language':language
   }});
}

export function uploadImage(fileCreateRequest, constructionDetailId, language) {
  // console.log("123132",JSON.stringify(fileCreateRequest))
  // return apiClientNoContentType.post( API_CONFIG.UP_IMG, {functionName,fileCreateRequest});
  return apiClientNoContentType.post(API_CONFIG.UP_IMG, fileCreateRequest, { params: { constructionDetailId },headers: {
    'Accept-Language':language
   } });
} 