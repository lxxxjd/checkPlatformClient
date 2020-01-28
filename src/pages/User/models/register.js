import { fakeRegister } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import { getRepeatUsername ,sendVerify,verifyTel,addUser, getRepeatTel } from '@/services/user';

export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(fakeRegister, payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
    *sendVerify({ payload,callback }, { call, put }) {
      const response = yield call(sendVerify, payload);
      yield put({
        type: 'sendVerifyResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    *verifyTel({ payload,callback }, { call, put }) {
      const response = yield call(verifyTel, payload);
      yield put({
        type: 'getVerifyTelResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    *getRepeatTel({ payload,callback }, { call, put }) {
      const response = yield call(getRepeatTel, payload);
      if (callback) callback(response.data);
    },

    *getRepeatUsername({ payload,callback }, { call, put }) {
      const response = yield call(getRepeatUsername, payload);
      yield put({
        type: 'getCheckUserNameResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },


    *addContact({ payload,callback }, { call, put }) {
      const response = yield call(addContact, payload);
      yield put({
        type: 'registerPreCompanyResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      setAuthority('user');
      reloadAuthorized();
      return {
        ...state,
        status: payload.status,
      };
    },

    getCheckUserNameResult(state, { payload }) {
      return {
        ...state,
        checkUserNameResult: payload.data,
      };
    },
    sendVerifyResult(state, { payload }) {
      return {
        ...state,
        verifyResult: payload.data,
      };
    },


    getVerifyTelResult(state, { payload }) {
      return {
        ...state,
        verifyTelResult: payload.data,
      };
    },


    registerPreCompanyResult(state, { payload }) {
      return {
        ...state,
        registerPreCompanyResult: payload.data,
      };
    },
  },

};
