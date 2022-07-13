// import { TYPES } from '../types.js';
// export const setLang = () => {
//     return async (dispatch) => {
//       try {
//         const output = await ListconstructionDetail("getUpload");
//         // console.log("constructionStatus :" +JSON.stringify(output));
//         dispatch({ type: TYPES.SET_LANGUAGE, payload: { constructionStatus: output.data } });
//       } catch (e) {
//         dispatch({
//           type: TYPES.GET_lIST_CONSTRUCTION_FAILED,
//           payload: { error: 'List Construction error' },
//         });
//       }
//     };
//   };