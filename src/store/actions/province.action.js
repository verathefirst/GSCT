import { TYPES } from '../types.js';
import { fetchProvince } from '../../services/province.service.js';

export const getProvince = () => {
    return async (dispatch) => {
      try {
        const output = await fetchProvince("getListProvince");
       
        dispatch({ type: TYPES.GET_PROVINCE_SUCCESS, payload: { provinces: output.data } });
      } catch (e) {
        dispatch({
          type: TYPES.GET_PROVINCE_FAILED,
          payload: { error: 'Fetch province error' },
        });
      }
    };
  };