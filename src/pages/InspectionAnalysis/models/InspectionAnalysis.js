import {getAllSample,getCompany,getItems,addDetail,getStandards,getItemNames,deleteDetails,addDetails,
  getAllDetails,addResult,assign,getTestBySampleNo,getAllSampleAndTestMan,getReport,getAllTaskInspman,deleteTestBySampleNo,updateTestInfo,getSamplesByApplicant,loadDetails} from '@/services/InspectionAnalysis'



export default {
  namespace: 'inspectionAnalysis',
  state: {
    samples : {
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
    details:[]
  },

  effects: {
    *getSamplesByApplicant({ payload,callback }, { call, put }) {
      const response = yield call(getSamplesByApplicant, payload);
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
    *getAllSampleAndTestMan({ payload,callback }, { call, put }) {
      const response = yield call(getAllSampleAndTestMan, payload);
      yield put({
        type: 'getAllSampleAndTestManInfo',
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
    getAllSampleAndTestManInfo(state, { payload }) {
      return {
        ...state,
        samples: payload.data,
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
