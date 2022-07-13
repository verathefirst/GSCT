import { TYPES } from '../types.js';
import { fetchConstructionStatus } from '../../services/construction.service';
import { searchConstruction } from '../../services/construction.service';

export const getConstructionStatus = (language) => {
    return async (dispatch) => {
      try {
        const output = await fetchConstructionStatus("getListConstructionStatus",language);
        // console.log("constructionStatus :" +JSON.stringify(output));
        dispatch({ type: TYPES.GET_CONSTRUCTION_STATUS_SUCCESS, payload: { constructionStatus: output.data } });
      } catch (e) {
        dispatch({
          type: TYPES.GET_PROVINCE_FAILED,
          payload: { error: 'Fetch constructionStatus error' },
        });
      }
    };
  };
  export const findConstruction = (constructionDTO) => {
    return async (dispatch) => {
      try {
        const output = await searchConstruction("searchConstruction",constructionDTO);
        // console.log("searchConstruction :" +JSON.stringify(output));
        dispatch({ type: TYPES.GET_CONSTRUCTIONS_SUCCESS, payload: { constructions: output.data } });
      } catch (e) {
        dispatch({
          type: TYPES.GET_CONSTRUCTIONS_FAILED,
          payload: { error: 'findConstruction error' },
        });
      }
    };
  };
  export const getDetailConstruction = (constructionDTO) => {
    return async (dispatch) => {
      try {
        const output = await constructionDetail("constructionDetail",constructionDTO);
        // console.log("constructionDetail :" +JSON.stringify(output));
        dispatch({ type: TYPES.GET_CONSTRUCTIONS_DETAIL_SUCCESS, payload: { constructions: output.data } });
      } catch (e) {
        dispatch({
          type: TYPES.GET_CONSTRUCTIONS_DETAIL_FAILED,
          payload: { error: 'getDetailConstruction error' },
        });
      }
    };
  };
    export const getListConstruction = (constructionDTO) => {
    return async (dispatch) => {
      try {
        const output = await constructionDetail("constructionDetail",constructionDTO);
        // console.log("constructionDetail :" +JSON.stringify(output));
        dispatch({ type: TYPES.GET_CONSTRUCTIONS_DETAIL_SUCCESS, payload: { constructions: output.data } });
      } catch (e) {
        dispatch({
          type: TYPES.GET_CONSTRUCTIONS_DETAIL_FAILED,
          payload: { error: 'getDetailConstruction error' },
        });
      }
    };
  };
  