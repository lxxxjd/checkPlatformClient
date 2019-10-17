import {getCertReports,getCertFiles,uploadCertFile,deleteCertFile,getSignature} from '@/services/Certificate'




export default {
  namespace: 'certificate',
  state: {
    data:[],
    recordData:[],
    signData:{},
  },

  effects: {
    *getCertReports({ payload,callback }, { call, put }) {
      const response = yield call(getCertReports, payload);
      yield put({
        type: 'getCertReport',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *getCertFiles({ payload,callback }, { call, put }) {
      const response = yield call(getCertFiles, payload);
      yield put({
        type: 'getCertFile',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *uploadCertFile({ payload,callback }, { call, put }) {
      const response = yield call(uploadCertFile, payload);
      if (callback) callback(response);
    },
    *deleteCertFile({ payload,callback }, { call, put }) {
      const response = yield call(deleteCertFile, payload);
      if (callback) callback(response);
    },

    *getSignature({ payload,callback }, { call, put }) {
      const response = yield call(getSignature, payload);
      yield put({
        type: 'getSignatureInfo',
        payload: response,
      });
      if (callback) callback(response);
    },

  },

  reducers: {
    getCertReport(state, { payload }) {
      return {
        ...state,
        data: payload.data,
      };
    },
    getCertFile(state, { payload }) {
      return {
        ...state,
        recordData: payload.data,
      };
    },

    getSignatureInfo(state, { payload }) {
      return {
        ...state,
        signData: payload.data,
      };
    },
  },
};
