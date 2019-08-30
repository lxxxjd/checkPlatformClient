import { getAllList,getReports} from '@/services/Charge';

export default {
  namespace: 'charge',
  state: {
    data: [],
    reports:[], // listAdd reports
  },
  effects: {
    *fetch({ payload,callback }, { call, put }) {
      const response = yield call(getAllList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *getReportsFetch({ payload,callback }, { call, put }) {
      const response = yield call(getReports, payload);
      yield put({
        type: 'saveReports',
        payload: response,
      });
      if (callback) callback(response.data);
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        data: payload.data,
      };
    },

    saveReports(state, { payload }) {
      return {
        ...state,
        reports: payload.data,
      };
    },

  },

};
