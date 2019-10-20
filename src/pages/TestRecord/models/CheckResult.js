
import {getStandard,getInstrument,addCheckResult,updateCheckResult,deleteCheckResult,getProject,getCheckResult,getTaskByReportNoAndInspway} from '@/services/CheckResult'



export default {
  namespace: 'checkResult',

  state: {
    data:[],
    inspwayData:[],
    projectData:[],
  },

  effects: {
    *getInstrument({ payload,callback }, { call, put }) {
      const response = yield call(getInstrument, payload);
      if (callback) callback(response);
    },
    *getStandard({ payload,callback }, { call, put }) {
      const response = yield call(getStandard, payload);
      if (callback) callback(response);
    },
    *getTaskByReportNoAndInspway({ payload,callback }, { call, put }) {
      const response = yield call(getTaskByReportNoAndInspway, payload);
      if (callback) callback(response);
    },
    *addCheckResult({ payload,callback }, { call, put }) {
      const response = yield call(addCheckResult, payload);
      if (callback) callback(response);
    },
    *deleteCheckResult({ payload,callback }, { call, put }) {
      const response = yield call(deleteCheckResult, payload);
      if (callback) callback(response);
    },
    *updateCheckResult({ payload,callback }, { call, put }) {
      const response = yield call(updateCheckResult, payload);
      if (callback) callback(response);
    },
    *getProject({ payload,callback }, { call, put }) {
      const response = yield call(getProject, payload);
      yield put({
        type: 'getProjects',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *getCheckResult({ payload,callback }, { call, put }) {
      const response = yield call(getCheckResult, payload);
      yield put({
        type: 'getCheckResults',
        payload: response,
      });
      if (callback) callback(response.data);
    },
  },

  reducers: {
    getProjects(state, { payload }) {
      return {
        ...state,
        projectData: payload.data,
      };
    },
    getCheckResults(state, { payload }) {
      return {
        ...state,
        data: payload.data,
      };
    },
  },
};
