import { TYPES } from '../types.js';

const initState = {
    loading: false,
    token: '',
    error: '',
    constructionStatus:[],
    constructions:[]
};

const constructionReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case TYPES.GET_CONSTRUCTION_STATUS_SUCCESS:
            return {
                ...state,
                constructionStatus: payload.constructionStatus,
            };
        case TYPES.GET_CONSTRUCTION_STATUS_FAILED:
            return {
                ...state,
                error: payload.error,
            };
        case TYPES.GET_CONSTRUCTIONS_SUCCESS:
            return {
                ...state,
                constructions: payload,
            };
        case TYPES.GET_CONSTRUCTIONS_FAILED:
            return {
                ...state,
                error: payload.error,
            };
        case TYPES.GET_CONSTRUCTIONS_DETAIL_SUCCESS:
            return {
                ...state,
                constructionsDetail: payload,
            };
        case TYPES.GET_CONSTRUCTIONS_DETAIL_FAILED:
            return {
                ...state,
                error: payload.error,
            };
            

        default:
            return state;
    }
};

export default constructionReducer;