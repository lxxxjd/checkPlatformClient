import {getTestInfo,queryReport,getReportLink,addReportLink,deleteReportLink,getReportexceptLink,getCheckProject,
  getCompany,getTestByReportNo,addTestInfo,updateTestInfo,deleteTestBySampleNo,getReport,getPriceMaking,getTestByReportNoAndAssignsort} from '@/services/TestInfo'



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
    TestInfo:[],
  },

  effects: {
    *getReports({ payload,callback }, { call, put }) {
      const response = yield call(queryReport, payload);
      if (callback) callback(response.data);
    },
    *getReport({ payload,callback }, { call, put }) {
      const response = yield call(getReport, payload);
      if (callback) callback(response.data);
    },
    *getPriceMaking({ payload,callback }, { call, put }) {
      const response = yield call(getPriceMaking, payload);
      if (callback) callback(response.data);
    },
    *getReportexceptLink({ payload }, { call, put }) {
      const response = yield call(getReportexceptLink, payload);
      yield put({
        type: 'getReportEcpLink',
        payload: response,
      });
    },
    *getTestByReportNo({ payload }, { call, put }) {
      const response = yield call(getTestByReportNo, payload);
      yield put({
        type: 'getTestInfo',
        payload: response,
      });
    },

    *getTestByReportNoAndAssignsort({ payload,callback }, { call, put }) {
      const response = yield call(getTestByReportNoAndAssignsort, payload);
      if (callback) callback(response);
    },

    *addTestInfo({ payload,callback }, { call, put }) {
      const response = yield call(addTestInfo, payload);
      yield put({
        type: 'getTestInfo',
        payload: response,
      });
      if (callback) callback();
    },
    *updateTestInfo({ payload,callback }, { call, put }) {
      const response = yield call(updateTestInfo, payload);
      yield put({
        type: 'getTestInfo',
        payload: response,
      });
      if (callback) callback();
    },
    *deleteTestBySampleNo({ payload,callback }, { call, put }) {
      const response = yield call(deleteTestBySampleNo, payload);
      if (callback) callback(response);
    },

    *getTestInfos({ payload,callback }, { call, put }) {
      const response = yield call(getTestInfo, payload);
      if (callback) callback(response);
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
      if (callback) callback(response);
    },
    *getCheckProject({ payload,callback }, { call, put }) {
      const response = yield call(getCheckProject, payload);
      yield put({
        type: 'getCheckProjectName',
        payload:response,
      });
      if (callback) callback(response.data);
    },
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
    getReportList(state, { payload }) {
      return {
        ...state,
        relevanceData: payload.data,
      };
    },
    getTestInfo(state, { payload }) {
      return {
        ...state,
        TestInfo: payload.data,
      };
    },
    getCompanyName(state, { payload }) {
      return {
        ...state,
        companyName: payload.data,
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
