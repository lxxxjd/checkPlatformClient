import { getAllList,getReports,addList} from '@/services/Charge';

export default {
  namespace: 'charge',
  state: {
    data: [],
    reports:[], // listAdd reports
    addresult:{},
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

    *addListFetch({ payload,callback }, { call, put }) {
      const response = yield call(addList, payload);
      yield put({
        type: 'saveAddList',
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

    saveAddList(state, { payload }) {
      return {
        ...state,
        addresult: payload.data,
      };
    }
  }

};
