import { TYPES } from '../types';

const authActions = {
  loginSuccess(payload) {
    return {
      type: TYPES.LOGIN_SUCCESS,
      payload,
    };
  },

  loginFailed(payload) {
    return {
      type: TYPES.LOGIN_FAILED,
      payload,
    };
  },

  logOut() {
    return {
      type: TYPES.LOG_OUT,
    };
  },

  expiredToken(message) {
    return {
      type: TYPES.EXPIRED_TOKEN,
      payload: {
        error: message,
      },
    };
  },
};

export default authActions;
