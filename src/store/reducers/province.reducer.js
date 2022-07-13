import { TYPES } from '../types.js';

const initState = {
    isLoggedIn: false,
    loading: false,
    token: '',
    error: '',
    provinces:[]
};

const provinceReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case TYPES.GET_PROVINCE_SUCCESS:
            return {
                ...state,
                provinces: payload.provinces,
            };
        case TYPES.GET_PROVINCE_FAILED:
            return {
                ...state,
                error: payload.error,
            };
        default:
            return state;
    }
};

export default provinceReducer;