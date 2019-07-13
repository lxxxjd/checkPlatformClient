import {getTestInfo,queryReport,getReportLink,addReportLink,deleteReportLink,getReportexceptLink,getCheckProject} from '@/services/TestInfo'



export default {
  namespace: 'testInfo',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    relevanceData:{
      list: [],
      pagination: {},
    },
    report:[],
    companyName:[],
    CheckProject:[],
    link:[],
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
    *getReportexceptLink({ payload }, { call, put }) {
      const response = yield call(getReportexceptLink, payload);
      yield put({
        type: 'getReportEcpLink',
        payload: response,
      });
    },
    *getTestInfos({ payload }, { call, put }) {
      const response = yield call(getTestInfo, payload);
      yield put({
        type: 'get',
        payload: response,
      });
    },
    *getReportLink({ payload }, { call, put }) {
      const response = yield call(getReportLink, payload);
      yield put({
        type: 'getLink',
        payload: response,
      });
    },
    *addReportLink({ payload,callback }, { call, put }) {
      const response = yield call(addReportLink, payload);
      yield put({
        type: 'getLink',
        payload: response,
      });
      if (callback) callback();
    },
    *deleteReportLink({ payload,callback }, { call, put }) {
      const response = yield call(deleteReportLink, payload);
      yield put({
        type: 'getLink',
        payload: response,
      });
      if (callback) callback();
    },
    *getCheckProject({ payload,callback }, { call, put }) {
      const response = yield call(getCheckProject, payload);
      yield put({
        type: 'getCheckProjectName',
        payload:response,
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
    getReportEcpLink(state, { payload }) {
      return {
        ...state,
        report: payload.data,
      };
    },
    getCheckProjectName(state, { payload }) {
      return {
        ...state,
        CheckProject: payload.data,
      };
    },
    get(state, { payload }) {
      return {
        ...state,
        data: payload.data,
      };
    },
    getLink(state, { payload }) {
      return {
        ...state,
        link: payload.data,
      };
    },
  },
};
