import {getAllSample,getCompany,getItems,addDetail,getStandards,getItemNames,deleteDetails,addDetails,
  getAllDetails,addResult,assign,getTestBySampleNo,getAllSampleAndTestMan,getReport,getAllTaskInspman,
  deleteTestBySampleNo,updateTestInfo,getSamplesByFilter,loadDetails,getTestStandard,modifyDetail,
  reviewSampleRegister,returnSampleRegister,getAllSampleAndTestCompany,deleteDetailItem,
} from '@/services/InspectionAnalysis'
import {saveResultList} from '@/services/TestRecord'
import {getInstrumentIDName} from '@/services/Intrusment'
import {getInspman} from '@/services/Task'

export default {
  namespace: 'inspectionAnalysis',
  state: {
    samples : {
      list : [],
      pagination : {},
    },

    samplesSubcontact : {
      list : [],
      pagination : {},
    },

    testInfo: [],
    companyName : [],
    detail : [],
    items : [],
    standard : [],
    itemName : [],
    inspman:[],
    reportSample:[],
    details:[],
    testStandards:[],
  },

  effects: {

    *getInspman({ payload,callback }, { call, put }) {
      const response = yield call(getInspman, payload);
      if (callback) callback(response);
    },

    *getInstrumentIDName({ payload,callback }, { call, put }) {
      const response = yield call(getInstrumentIDName, payload);
      if (callback) callback(response);
    },

    *reviewSampleRegister({ payload,callback }, { call, put }) {
        const response = yield call(reviewSampleRegister, payload);
        if (callback) callback(response.data);
    },

    *returnSampleRegister({ payload,callback }, { call, put }) {
      const response = yield call(returnSampleRegister, payload);
      if (callback) callback(response.data);
    },

    *saveResultList({ payload,callback }, { call, put }) {
      const response = yield call(saveResultList, payload);
      if (callback) callback(response.data);
    },

    *getSamplesByFilter({ payload,callback }, { call, put }) {
      const response = yield call(getSamplesByFilter, payload);
      yield put({
        type: 'getSamples',
        payload:response,
      });
      if (callback) callback(response.data);
    },
    *loadDetails({ payload,callback }, { call, put }) {
      const response = yield call(loadDetails, payload);
      if (callback) callback(response);
    },
    *getTestStandard({ payload,callback }, { call, put }) {
      const response = yield call(getTestStandard, payload);
      yield put({
        type: 'getTestStandards',
        payload:response,
      });
      if (callback) callback(response);
    },
    *getAllSampleAndTestMan({ payload,callback }, { call, put }) {
      const response = yield call(getAllSampleAndTestMan, payload);
      yield put({
        type: 'getAllSampleAndTestManInfo',
        payload:response,
      });
      if (callback) callback(response.data);
    },


    *getAllSampleAndTestCompany({ payload,callback }, { call, put }) {
      const response = yield call(getAllSampleAndTestCompany, payload);
      yield put({
        type: 'getAllSampleAndTestCompanyInfo',
        payload:response,
      });
      if (callback) callback(response.data);
    },

    *getCompany({ payload,callback }, { call, put }) {
      const response = yield call(getCompany, payload);
      yield put({
        type: 'getCompanyName',
        payload:response,
      });
      if (callback) callback(response.data);
    },
    *updateTestInfo({ payload,callback }, { call, put }) {
      const response = yield call(updateTestInfo, payload);
      if (callback) callback(response);
    },
    *deleteTestBySampleNo({ payload,callback }, { call, put }) {
      const response = yield call(deleteTestBySampleNo, payload);
      if (callback) callback(response);
    },
    *getAllTaskInspman({ payload,callback }, { call, put }) {
      const response = yield call(getAllTaskInspman, payload);
      yield put({
        type: 'getAllTaskInspmans',
        payload:response,
      });
    },
    *getAllDetails({ payload,callback }, { call, put }) {
      const response = yield call(getAllDetails, payload);
      yield put({
        type: 'getDetail',
        payload:response,
      });
      if (callback) callback(response.data);
    },
    *getDetails({ payload,callback }, { call, put }) {
      const response = yield call(getAllDetails, payload);
      yield put({
        type: 'getDetaila',
        payload:response,
      });
      if (callback) callback(response.data);
    },
    *getItems({ payload,callback }, { call, put }) {
      const response = yield call(getItems, payload);
      yield put({
        type: 'getItem',
        payload:response,
      });
      if (callback) callback(response.data);
    },
    *getReport({ payload,callback }, { call, put }) {
      const response = yield call(getReport, payload);
      if (callback) callback(response);
    },
    *addDetail({ payload,callback }, { call, put }) {
      const response = yield call(addDetail, payload);
      yield put({
        type: 'addOneDetail',
        payload:response,
      });
      if (callback) callback(response);
    },
    *addResult({ payload,callback }, { call, put }) {
      const response = yield call(addResult, payload);
      if (callback) callback(response);
    },
    *modifyDetail({ payload,callback }, { call, put }) {
      const response = yield call(modifyDetail, payload);
      if (callback) callback(response);
    },
    *getStandards({ payload,callback }, { call, put }) {
      const response = yield call(getStandards, payload);
      yield put({
        type: 'getStandard',
        payload:response,
      });
      if (callback) callback(response);
    },
    *getItemNames({ payload,callback }, { call, put }) {
      const response = yield call(getItemNames, payload);
      yield put({
        type: 'getItemName',
        payload:response,
      });
      if (callback) callback(response);
    },
    *deleteDetails({ payload,callback }, { call, put }) {
      const response = yield call(deleteDetails, payload);
      if (callback) callback(response);
    },

    *deleteDetailItem({ payload,callback }, { call, put }) {
      const response = yield call(deleteDetailItem, payload);
      if (callback) callback(response);
    },

    *addDetails({ payload,callback }, { call, put }) {
      const response = yield call(addDetails, payload);
      if (callback) callback(response);
    },
    *assign({ payload,callback }, { call, put }) {
      const response = yield call(assign, payload);
      if (callback) callback(response);
    },
    *getTestBySampleNo({ payload }, { call, put }) {
      const response = yield call(getTestBySampleNo, payload);
      yield put({
        type: 'getTestBySampleNos',
        payload: response,
      });
    },
  },

  reducers: {
    getSamples(state, { payload }) {
      return {
        ...state,
        reportSample: payload.data,
      };
    },
    getTestStandards(state, { payload }) {
      return {
        ...state,
        testStandards: payload.data,
      };
    },
    getAllSampleAndTestManInfo(state, { payload }) {
      this.state.samples=[];
      return {
        ...state,
        samples: payload.data,
      };
    },

    getAllSampleAndTestCompanyInfo(state, { payload }) {
      return {
        ...state,
        samplesSubcontact: payload.data,
      };
    },


    getAllTaskInspmans(state, { payload }) {
      return {
        ...state,
        inspman: payload.data,
      };
    },
    getTestBySampleNos(state, { payload }) {
      return {
        ...state,
        testInfo: payload.data,
      };
    },
    getCompanyName(state, { payload }) {
      return {
        ...state,
        companyName: payload.data,
      };
    },
    getDetail(state, { payload }) {
      return {
        ...state,
        detail: payload.data,
      };
    },
    getDetaila(state, { payload }) {
      return {
        ...state,
        details: payload.data,
      };
    },
    addDetail(state, { payload }) {
      return {
        ...state,
        detail: payload.data,
      };
    },
    getItem(state, { payload }) {
      return {
        ...state,
        items: payload.data,
      };
    },
    getStandard(state, { payload }) {
      return {
        ...state,
        standard: payload.data,
      };
    },
    getItemName(state, { payload }) {
      return {
        ...state,
        itemName: payload.data,
      };
    },
  },
};
