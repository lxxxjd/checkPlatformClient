import {getCertReports} from '@/services/Certificate'



export default {
  namespace: 'certificate',
  state: {
    data:[],
    recordData:[],
  },

  effects: {
    *getCertReports({ payload,callback }, { call, put }) {
      const response = yield call(getCertReports, payload);
      yield put({
        type: 'getCertReport',
        payload: response,
      });
      if (callback) callback(response.data);
    },
  },

  reducers: {
    getCertReport(state, { payload }) {
      return {
        ...state,
        data: payload.data,
      };
    },
  },
};
