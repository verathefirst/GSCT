import { TYPES } from '../types.js';
import { ListconstructionDetail } from '../../services/construction.service';

export const getUpload = () => {
    return async (dispatch) => {
      try {
        const output = await ListconstructionDetail("getUpload");
        // console.log("constructionStatus :" +JSON.stringify(output));
        dispatch({ type: TYPES.GET_LIST_CONSTRUCTION_SUCCESS, payload: { constructionStatus: output.data } });
      } catch (e) {
        dispatch({
          type: TYPES.GET_lIST_CONSTRUCTION_FAILED,
          payload: { error: 'List Construction error' },
        });
      }
    };
  };