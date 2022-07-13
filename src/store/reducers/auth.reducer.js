import { TYPES } from '../types.js';

const initState = {
    isLoggedIn: false,
    loading: false,
    token: '',
    error: '',
    lstMenu:[]
};

const authReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case TYPES.LOGIN_LOADING:
            return {
                ...state,
                loading: true,
            };
        case TYPES.LOGIN_SUCCESS:
            return {
                ...state,
                token: payload.token,
                lstMenu: payload.lstMenu,
                isLoggedIn: true,
                pending: false,
                error: '',
            };
        case TYPES.LOGIN_FAILED:
            return {
                ...state,
                pending: false,
                error: payload.error,
            };
        case TYPES.LOG_OUT:
            return {
                ...initState,
                isLoggedIn: false,
            };
        case TYPES.EXPIRED_TOKEN:
            return {
                ...initState,
                error: payload.error,
            };
        default:
            return state;
    }
};

export default authReducer;