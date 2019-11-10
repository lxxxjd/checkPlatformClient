import {getCertReports,getCertFiles,uploadCertFile,deleteCertFile,getPdfByOssPath,
  getSignature,signCertFile,reviewCertFile,sealCertFile,getSampleDetail,getCheckResult,getCheckResultForLink,getSampleDetailForLink,getRecordInfo,getPdfUrl} from '@/services/Certificate'

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
    // 品质信息的返回结果
    sampleDataResult:{},
    // 检查结果返回结果
    checkResultData:{},

    // 关联委托的信息
    sampleDetailForLinkResult:{},
    checkResultForLinkResult:{},
    recordinfoResult:{},
    pdfResult:{},
    pdfByOssPathResult:{},
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


    *getSampleDetailFetch({ payload,callback }, { call, put }) {
      const response = yield call(getSampleDetail, payload);
      yield put({
        type: 'getSampleDetailResult',
        payload: response,
      });
      if (callback) callback(response);
    },



    *getCheckResultFetch({ payload,callback }, { call, put }) {
      const response = yield call(getCheckResult, payload);
      yield put({
        type: 'getCheckResultData',
        payload: response,
      });
      if (callback) callback(response);
    },

    *getSampleDetailForLink({ payload,callback }, { call, put }) {
      const response = yield call(getSampleDetailForLink, payload);
      yield put({
        type: 'getSampleDetailForLinkResult',
        payload: response,
      });
      if (callback) callback(response);
    },


    *getCheckResultForLink({ payload,callback }, { call, put }) {
      const response = yield call(getCheckResultForLink, payload);
      yield put({
        type: 'getCheckResultForLinkResult',
        payload: response,
      });
      if (callback) callback(response);
    },

    *getRecordInfo({ payload,callback }, { call, put }) {
      const response = yield call(getRecordInfo, payload);
      yield put({
        type: 'getRecordInfoResult',
        payload: response,
      });
      if (callback) callback(response);
    },

    *getPdfUrlFetch({ payload,callback }, { call, put }) {
      const response = yield call(getPdfUrl, payload);
      yield put({
        type: 'getPdfUrlResult',
        payload: response,
      });
      if (callback) callback(response);
    },


    *getPdfByOssPath({ payload,callback }, { call, put }) {
      const response = yield call(getPdfByOssPath, payload);
      yield put({
        type: 'getPdfByOssPathResult',
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

    getSampleDetailResult(state, { payload }) {
      return {
        ...state,
        sampleDataResult: payload,
      };
    },


    getCheckResultData(state, { payload }) {
      return {
        ...state,
        checkResultData: payload,
      };
    },

    //

    getSampleDetailForLinkResult(state, { payload }) {
      return {
        ...state,
        sampleDetailForLinkResult: payload,
      };
    },


    getCheckResultForLinkResult(state, { payload }) {
      return {
        ...state,
        checkResultForLinkResult: payload,
      };
    },

    getRecordInfoResult(state, { payload }) {
      return {
        ...state,
        recordinfoResult: payload,
      };
    },
    getPdfUrlResult(state, { payload }) {
      return {
        ...state,
        pdfResult: payload,
      };
    },

    getPdfByOssPathResult(state, { payload }) {
      return {
        ...state,
        pdfByOssPathResult: payload,
      };
    },
  },
};
