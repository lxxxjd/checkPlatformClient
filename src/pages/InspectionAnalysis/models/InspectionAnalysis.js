import {getAllSample,getCompany,getDetails,getItems,addDetail,getStandards,getItemNames,deleteDetails,addDetails,getAllDetails,addResult,assign,getTestBySampleNo} from '@/services/InspectionAnalysis'



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

  },

  effects: {
    *getAllSample({ payload,callback }, { call, put }) {
      const response = yield call(getAllSample, payload);
      yield put({
        type: 'getAllSamples',
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
    *getDetails({ payload,callback }, { call, put }) {
      const response = yield call(getDetails, payload);
      yield put({
        type: 'getDetail',
        payload:response,
      });
      if (callback) callback(response.data);
    },
    *getAllDetails({ payload,callback }, { call, put }) {
      const response = yield call(getAllDetails, payload);
      yield put({
        type: 'getDetail',
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
    getAllSamples(state, { payload }) {
      return {
        ...state,
        samples: payload.data,
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
