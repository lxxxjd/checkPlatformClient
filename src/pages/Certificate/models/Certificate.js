import {getCertReports,getCertFiles,uploadCertFile,deleteCertFile,getSignature,signCertFile,reviewCertFile,sealCertFile} from '@/services/Certificate'

import {getOssPdf} from '@/services/TestRecord'
import { queryReport} from '@/services/Entrustment';



export default {
  namespace: 'certificate',
  state: {
    data:[],
    recordData:[],
    signData:{},
    ossPdfResult:{},
    report:[],
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
    *signCertFile({ payload,callback }, { call, put }) {
      const response = yield call(signCertFile, payload);
      if (callback) callback(response);
    },
    *reviewCertFile({ payload,callback }, { call, put }) {
      const response = yield call(reviewCertFile, payload);
      if (callback) callback(response);
    },
    *sealCertFile({ payload,callback }, { call, put }) {
      const response = yield call(sealCertFile, payload);
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


    *getOssPdf({ payload,callback }, { call, put }) {
      const response = yield call(getOssPdf, payload);
      yield put({
        type: 'getOssPdfInfo',
        payload: response,
      });
      if (callback) callback(response);
    },

    *getReport({ payload,callback }, { call, put }) {
      const response = yield call(queryReport, payload);
      yield put({
        type: 'get',
        payload: response,
      });
      if (callback) callback(response.data);
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

    get(state, { payload }) {
      return {
        ...state,
        report: payload.data,
      };
    },

    getSignatureInfo(state, { payload }) {
      return {
        ...state,
        signData: payload.data,
      };
    },

    getOssPdfInfo(state, { payload }) {
      return {
        ...state,
        ossPdfResult: payload.data,
      };
    },
  },
};
