import {getCompany} from '@/services/InspectionAnalysis'



export default {
  namespace: 'inspectionAnalysis',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    companyName:[],
  },

  effects: {
    *getCompany({ payload,callback }, { call, put }) {
      const response = yield call(getCompany, payload);
      yield put({
        type: 'getCompanyName',
        payload:response,
      });
      if (callback) callback(response.data);
    },
  },

  reducers: {
    getCompanyName(state, { payload }) {
      return {
        ...state,
        companyName: payload.data,
      };
    },
  },
};
