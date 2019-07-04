import { submitApplication ,queryAllReports,queryAllReportsByFilter} from '@/services/Entrustment';

export default {
  namespace: 'entrustment',
  state: {
    data: {
      list: [],
      pagination: {},
    },
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
  },

  reducers: {
    submit(state, { payload }) {
      return {
        ...state,
        data: payload,
      };
    },
    save(state, action) {
      return {
        ...state,
        data: action.payload.data,
      };
    },
  },
};
