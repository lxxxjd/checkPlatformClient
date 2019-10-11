import { getAllArchives,updateReport} from '@/services/Archives';
import { queryAllReports } from '@/services/Entrustment';

export default {
  namespace: 'archives',
  state: {
    data: [],
    report: [],
    updateArchivesResult:{},
  },
  effects: {
    *fetch({ payload,callback }, { call, put }) {
      const response = yield call(getAllArchives, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    *getAllReports({ payload }, { call, put }) {
      const response = yield call(queryAllReports, payload);
      yield put({
        type: 'queryReports',
        payload: response,
      });
    },

    *updateArchivesFetch({ payload, callback }, { call, put }) {
      const response = yield call(updateReport, payload);
      yield put({
        type: 'updateArchives',
        payload:response,
      });
      if (callback) callback(response);
    },

  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        data: payload.data,
      };
    },

    queryReports(state, { payload }) {
      return {
        ...state,
        report: payload.data,
      };
    },

    updateArchives(state, { payload }) {
      return {
        ...state,
        updateArchivesResult: payload,
      };
    },



  }

};
