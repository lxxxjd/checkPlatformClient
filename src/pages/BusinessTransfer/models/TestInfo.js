import {getTestInfo,queryReport,getAllClientName} from '@/services/TestInfo'



export default {
  namespace: 'testInfo',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *getReports({ payload,callback }, { call, put }) {
      const response = yield call(queryReport, payload);
      yield put({
        type: 'getReport',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *getTestInfos({ payload }, { call, put }) {
      const response = yield call(getTestInfo, payload);
      yield put({
        type: 'get',
        payload: response,
      });
    },
    *getClientName({ payload ,callback}, { call, put }) {
      const response = yield call(getAllClientName, payload);
      yield put({
        type: 'getName',
        payload:response,
      });
      if (callback) callback(response.data);
    },
  },

  reducers: {
    getReport(state, { payload }) {
      return {
        ...state,
        data: payload.data,
      };
    },
    get(state, { payload }) {
      return {
        ...state,
        data: payload.data,
      };
    },
    getName(state, { payload }) {
      return {
        ...state,
        clientName: payload.data,
      };
    },
  },
};
