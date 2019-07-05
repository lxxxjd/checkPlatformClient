
import { submitApplication ,queryAllReports,queryAllReportsByFilter,queryReport,cancelReportItem} from '@/services/Entrustment';

export default {
  namespace: 'entrustment',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    report:{}
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
        data: payload,
      };
    },
    get(state, { payload }) {
      return {
        ...state,
        report: payload.data,
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
