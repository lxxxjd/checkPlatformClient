import {getCertReports,getCertFiles,uploadCertFile,deleteCertFile,getPdfByOssPath,
  getSignature,signCertFile,reviewCertFile,sealCertFile,getSampleDetail,
  getCheckResult,getCheckResultForLink,getSampleDetailForLink,getRecordInfo,getPdfUrl,
  getMainInfo,convertWordToPdf,getAllUserListByCertCode,undoCert,
  makeCertFile,downloadQualityTemp,downloadWeighTemp,uploadCertFilePdf,publishCert,applyAbandon,abandonCert,getAbandonApplyReason,getRepeatName} from '@/services/Certificate'

import {getOssPdf,getModelSelectName} from '@/services/TestRecord'
import { queryReport} from '@/services/Entrustment';
import {getSampleRegistersByReportNo  } from '@/services/Sample'
import {getAllReadRecords  } from '@/services/ReadRecord'


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
    getMainInfoResult:{},
    convertWortToPdfResult:{},
    getModelSelectNameResult:{},
    getAllUserListByCertCodeResult:{},
    undoCertResult:{},
    makeCertFileResult:{},
    downloadQualityTempResult:{},
    publishCertResult:{},
    getAllReadRecordsResult:{},
    applyAbandonResult:{},
    abandonCertResult:{},
  },

  effects: {

    *getRepeatName({ payload,callback }, { call, put }) {
      const response = yield call(getRepeatName, payload);
      if (callback) callback(response.data);
    },


    *getAbandonApplyReason({ payload,callback }, { call, put }) {
      const response = yield call(getAbandonApplyReason, payload);
      if (callback) callback(response.data);
    },

    *abandonCert({ payload,callback }, { call, put }) {
      const response = yield call(abandonCert, payload);
      yield put({
        type: 'abandonCertResult',
        payload: response,

      });
      if (callback) callback(response.data);
    },

    *applyAbandon({ payload,callback }, { call, put }) {
      const response = yield call(applyAbandon, payload);
      yield put({
        type: 'applyAbandonResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },


    *getAllReadRecords({ payload,callback }, { call, put }) {
      const response = yield call(getAllReadRecords, payload);
      yield put({
        type: 'getAllReadRecordsResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },


    *makeCertFile({ payload,callback }, { call, put }) {
      const response = yield call(makeCertFile, payload);
      yield put({
        type: 'makeCertFileResult',
        payload: response,
      });
      if (callback) callback(response);
    },

    *undoCert({ payload,callback }, { call, put }) {
      const response = yield call(undoCert, payload);
      yield put({
        type: 'undoCertResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },




    *getAllUserListByCertCode({ payload,callback }, { call, put }) {
      const response = yield call(getAllUserListByCertCode, payload);
      yield put({
        type: 'getAllUserListByCertCodeResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    *convertWordToPdf({ payload,callback }, { call, put }) {
      const response = yield call(convertWordToPdf, payload);
      yield put({
        type: 'convertWortToPdfResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },

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
    *uploadCertFilePdf({ payload,callback }, { call, put }) {
      const response = yield call(uploadCertFilePdf, payload);
      if (callback) callback(response);
    },


    *publishCert({ payload,callback }, { call, put }) {
      const response = yield call(publishCert, payload);
      yield put({
        type: 'publishCertResult',
        payload: response,
      });
      if (callback) callback(response.data);
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

    *getMainInfo({ payload,callback }, { call, put }) {
      const response = yield call(getMainInfo, payload);
      yield put({
        type: 'getMainInfoResult',
        payload: response,
      });
      if (callback) callback(response.data);
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

    *getSampleRegistersByReportNo({ payload,callback }, { call, put }) {
      const response = yield call(getSampleRegistersByReportNo, payload);
      yield put({
        type: 'getByReportNo',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    *downloadQualityTemp({ payload,callback }, { call, put }) {
      const response = yield call(downloadQualityTemp, payload);
      yield put({
        type: 'downloadQualityTempResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    *downloadWeighTemp({ payload,callback }, { call, put }) {
      const response = yield call(downloadWeighTemp, payload);
      if (callback) callback(response.data);
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


    *getModelSelectName({ payload,callback }, { call, put }) {
      const response = yield call(getModelSelectName, payload);
      yield put({
        type: 'getRecordInfoResult',
        payload: response.data,
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

    getMainInfoResult(state, { payload }) {
      return {
        ...state,
        getMainInfoResult: payload.data,
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

    convertWortToPdfResult(state, { payload }) {
      return {
        ...state,
        convertWortToPdfResult: payload.data,
      };
    },

    getModelSelectNameResult(state, { payload }) {
      return {
        ...state,
        getModelSelectNameResult: payload.data,
      };
    },

    getAllUserListByCertCodeResult(state, { payload }) {
      return {
        ...state,
        getAllUserListByCertCodeResult: payload.data,
      };
    },

    undoCertResult(state, { payload }) {
      return {
        ...state,
        undoCertResult: payload.data,
      };
    },


    makeCertFileResult(state, { payload }) {
      return {
        ...state,
        makeCertFileResult: payload,
      };
    },


    downloadQualityTempResult(state, { payload }) {
      return {
        ...state,
        downloadQualityTempResult: payload.data,
      };
    },


    publishCertResult(state, { payload }) {
      return {
        ...state,
        publishCertResult: payload.data,
      };
    },

    getAllReadRecordsResult(state, { payload }) {
      return {
        ...state,
        getAllReadRecordsResult: payload.data,
      };
    },

    applyAbandonResult(state, { payload }) {
      return {
        ...state,
        applyAbandonResult: payload.data,
      };
    },


    abandonCertResult(state, { payload }) {
      return {
        ...state,
        abandonCertResult: payload.data,
      };
    },




  },
};
