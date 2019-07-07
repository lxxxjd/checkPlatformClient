import { submitApplication ,queryAllReports,queryAllReportsByFilter,
  queryReport,cancelReportItem,getAllClientName,getAllBusinessSort,getAllBusinessSource,getTradeWay} from '@/services/Entrustment';

export default {
  namespace: 'entrustment',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    report:{},
    clientName:[],
    businessSort:[],
    businessSource:[],
    tradeway: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryAllReports, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(submitApplication, payload);
      yield put({
        type: 'submit',
        payload,
      });
      if (callback) callback();
    },
    *filter({ payload }, { call, put }) {
      const response = yield call(queryAllReportsByFilter, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *getReport({ payload }, { call, put }) {
      const response = yield call(queryReport, payload);
      yield put({
        type: 'get',
        payload: response,
      });
      if (call) call();
    },
    *getClientName({ payload ,callback}, { call, put }) {
      const response = yield call(getAllClientName, payload);
      yield put({
        type: 'getName',
        payload:response,
      });
      if (callback) callback(response.data);
    },
    *getBusinessSort({ payload }, { call, put }) {
      const response = yield call(getAllBusinessSort, payload);
      yield put({
        type: 'getBusinessName',
        payload:response,
      });
    },
    *getBusinessSource({ payload }, { call, put }) {
      const response = yield call(getAllBusinessSource, payload);
      yield put({
        type: 'getBusinessSourceName',
        payload:response,
      });
    },
    *getTradeWay({ payload }, { call, put }) {
      const response = yield call(getTradeWay, payload);
      yield put({
        type: 'getTradeWayName',
        payload:response,
      });
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(cancelReportItem, payload);
      yield put({
        type: 'delete',
        payload:response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    submit(state, { payload }) {
      return {
        ...state,
        data: payload.data,
      };
    },
    get(state, { payload }) {
      return {
        ...state,
        report: payload.data,
      };
    },
    getName(state, { payload }) {
      return {
        ...state,
        clientName: payload.data,
      };
    },
    getBusinessName(state, { payload }) {
      return {
        ...state,
        businessSort: payload.data,
      };
    },
    getBusinessSourceName(state, { payload }) {
      return {
        ...state,
        businessSource: payload.data,
      };
    },
    getTradeWayName(state, { payload }) {
      return {
        ...state,
        tradeway: payload.data,
      };
    },
    save(state, action) {
      return {
        ...state,
        data: action.payload.data,
      };
    },
    delete(state, { payload }) {
      return {
        ...state,
        data: payload,
      };
    },
  },
};
