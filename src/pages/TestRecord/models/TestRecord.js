import {getTestInfo,queryReport,getReportLink,addReportLink,deleteReportLink,getReportexceptLink,getCheckProject,getCompany,getTestByReportNo,addTestInfo,updateTestInfo} from '@/services/TestInfo'



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
  },

  reducers: {
    getReport(state, { payload }) {
      return {
        ...state,
        relevanceData: payload.data,
      };
    },
  },
};
