
import {getRecordList,getRecordInfo,deleteRecordInfo,uploadFile,getRecord} from '@/services/TestRecord'



export default {
  namespace: 'testRecord',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    inspwayData:[],
    recordData:[],
    inspway:null,
    url:null,
  },

  effects: {
    *getRecordList({ payload,callback }, { call, put }) {
      const response = yield call(getRecordList, payload);
      yield put({
        type: 'getReport',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *getRecordInfo({ payload,callback }, { call, put }) {
      const response = yield call(getRecordInfo, payload);
      yield put({
        type: 'getRecords',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *getRecord({ payload,callback }, { call, put }) {
      const response = yield call(getRecord, payload);
      yield put({
        type: 'getURL',
        payload: response,
      });
      if (callback) callback(response);
    },
    *uploadFile({ payload,callback }, { call, put }) {
      const response = yield call(uploadFile, payload);
      if (callback) callback(response);
    },
    *deleteRecordInfo({ payload,callback }, { call, put }) {
      const response = yield call(deleteRecordInfo, payload);
      yield put({
        type: 'delete',
        payload: response,
      });
      if (callback) callback(response);
    },




  },

  reducers: {
    getURL(state, { payload }) {
      return {
        ...state,
        url : payload.data,
      };
    },
    getRecords(state, { payload }) {
      return {
        ...state,
        recordData : payload.data,
      };
    },
    getReport(state, { payload }) {
      return {
        ...state,
        data: payload.data,
      };
    },
    add(state, { payload }) {
      return {
        ...state,
        inspway:payload.data
      };
    },
    delete(state, { payload }) {
      return {
        ...state,
        inspway:payload.data
      };
    },
  },
};
