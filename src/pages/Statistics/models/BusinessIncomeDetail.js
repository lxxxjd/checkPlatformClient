import { queryReport, getCnasInfo} from '@/services/Entrustment';
import { getCheckResult} from '@/services/CheckResult';
import { getRecordInfo, getOssPdf} from '@/services/TestRecord';
import { getTestByReportNo} from '@/services/TestInfo';
import { getCertFiles} from '@/services/Certificate';

export default {
  namespace: 'businessIncomeDetail',
  state: {
    report:{},
  },

  effects: {
    *getReport({ payload,callback }, { call, put }) {
      const response = yield call(queryReport, payload);
      yield put({
        type: 'get',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *getCnasInfo({ payload ,callback}, { call, put }) {
      const response = yield call(getCnasInfo, payload);
      if (callback) callback(response);
    },
    *getCheckResult({ payload ,callback}, { call, put }) {
      const response = yield call(getCheckResult, payload);
      if (callback) callback(response);
    },
    *getRecordInfo({ payload ,callback}, { call, put }) {
      const response = yield call(getRecordInfo, payload);
      if (callback) callback(response);
    },
    *getOssPdf({ payload ,callback}, { call, put }) {
      const response = yield call(getOssPdf, payload);
      if (callback) callback(response);
    },
    *getTestByReportNo({ payload ,callback}, { call, put }) {
      const response = yield call(getTestByReportNo, payload);
      if (callback) callback(response);
    },
    *getCertFiles({ payload ,callback}, { call, put }) {
      const response = yield call(getTestByReportNo, payload);
      if (callback) callback(response);
    },
  },

  reducers: {
    get(state, { payload }) {
      return {
        ...state,
        report: payload.data,
      };
    },

  },

}
