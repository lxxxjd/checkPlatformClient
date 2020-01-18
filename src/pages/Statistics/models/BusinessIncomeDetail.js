import { queryReport, getCnasInfo} from '@/services/Entrustment';
import { getCheckResult} from '@/services/CheckResult';
import { getRecordInfo, getOssPdf} from '@/services/TestRecord';
import { getTestByReportNo} from '@/services/TestInfo';
import { getCertFiles} from '@/services/Certificate';
import { getTestBySampleNo, getAllSampleAndTestMan , getAllDetails, getAllSampleAndTestCompany} from '@/services/InspectionAnalysis'
import { getPriceMakingList } from '@/services/Business'
import {getCostBylistNO} from '@/services/Costlist'
import {getAllCost} from '@/services/Charge'

export default {
  namespace: 'businessIncomeDetail',
  state: {
    report:{},
  },

  effects: {
    // 成本信息
    *getCostInfosFetch({ payload,callback }, { call, put }) {
      const response = yield call(getAllCost, payload);
      if (callback) callback(response.data);
    },

    *getCostBylistNO({ payload,callback}, { call, put}){
      const response = yield call(getCostBylistNO, payload);
      if(callback) callback(response.data);
    },

    *getReport({ payload,callback }, { call, put }) {
      const response = yield call(queryReport, payload);
      yield put({
        type: 'get',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *getAllSampleAndTestMan({ payload ,callback}, { call, put }) {
      const response = yield call(getAllSampleAndTestMan, payload);
      if (callback) callback(response);
    },
    *getAllSampleAndTestCompany({ payload ,callback}, { call, put }) {
      const response = yield call(getAllSampleAndTestCompany, payload);
      if (callback) callback(response);
    },
    *getAllDetails({ payload,callback }, { call, put }) {
      const response = yield call(getAllDetails, payload);
      if (callback) callback(response);
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
      const response = yield call(getCertFiles, payload);
      if (callback) callback(response);
    },
    *getTestBySampleNo({ payload ,callback}, { call, put }) {
      const response = yield call(getTestBySampleNo, payload);
      if (callback) callback(response);
    },
    *getPriceMakingList({ payload ,callback}, { call, put }) {
      const response = yield call(getPriceMakingList, payload);
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
