
import {getAllReports,getInspway,getProject,addInspway,deleteInspway,getRecordList,getRecordInfo,
  deleteRecordInfo,uploadFile,getRecord ,getModelSelectName,downloadPlatFromTemp,updateInspway} from '@/services/TestRecord'



export default {
  namespace: 'mTestRecord',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    report:{},
    inspwayData:[],
    projectData:[],
    recordData:[],
    inspway:null,
    selectModelName:[],
    url:null,
    downloadTempResult:null,
  },

  effects: {
    *getReports({ payload,callback }, { call, put }) {
      const response = yield call(getAllReports, payload);
      yield put({
        type: 'getReport',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *getRecordList({ payload,callback }, { call, put }) {
      const response = yield call(getRecordList, payload);
      yield put({
        type: 'getRecordLists',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *getRecordInfo({ payload,callback }, { call, put }) {
      const response = yield call(getRecordInfo, payload);
      yield put({
        type: 'getRecords',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *getRecord({ payload,callback }, { call, put }) {
      const response = yield call(getRecord, payload);
      yield put({
        type: 'getURL',
        payload: response,
      });
      if (callback) callback(response);
    },
    *getInstrument({ payload,callback }, { call, put }) {
      const response = yield call(getInstrument, payload);
      if (callback) callback(response);
    },
    *getInspway({ payload,callback }, { call, put }) {
      const response = yield call(getInspway, payload);
      yield put({
        type: 'get',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *getProject({ payload,callback }, { call, put }) {
      const response = yield call(getProject, payload);
      yield put({
        type: 'getProjects',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *addInspway({ payload,callback }, { call, put }) {
      const response = yield call(addInspway, payload);
      yield put({
        type: 'add',
        payload: response,
      });
      if (callback) callback(response);
    },
    *updateInspway({ payload,callback }, { call, put }) {
      const response = yield call(updateInspway, payload);
      yield put({
        type: 'add',
        payload: response,
      });
      if (callback) callback(response);
    },
    *uploadFile({ payload,callback }, { call, put }) {
      const response = yield call(uploadFile, payload);
      yield put({
        type: 'add',
        payload: response,
      });
      if (callback) callback(response);
    },
    *deleteInspway({ payload,callback }, { call, put }) {
      const response = yield call(deleteInspway, payload);
      yield put({
        type: 'delete',
        payload: response,
      });
      if (callback) callback(response);
    },
    *deleteRecordInfo({ payload,callback }, { call, put }) {
      const response = yield call(deleteRecordInfo, payload);
      yield put({
        type: 'delete',
        payload: response,
      });
      if (callback) callback(response);
    },

    *getModelName({ payload,callback }, { call, put }) {
      const response = yield call(getModelSelectName, payload);
      yield put({
        type: 'getSelectName',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    *downloadPlatFromTemp({ payload,callback }, { call, put }) {
      const response = yield call(downloadPlatFromTemp, payload);
      yield put({
        type: 'downloadFromTemp',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *getStandard({ payload,callback }, { call, put }) {
      const response = yield call(getStandard, payload);
      if (callback) callback(response);
    },

  },

  reducers: {
    getURL(state, { payload }) {
      return {
        ...state,
        url : payload.data,
      };
    },
    getRecordLists(state, { payload }) {
      return {
        ...state,
        data : payload.data,
      };
    },
    getRecords(state, { payload }) {
      return {
        ...state,
        recordData : payload.data,
      };
    },
    getReport(state, { payload }) {
      return {
        ...state,
        report: payload.data,
      };
    },
    getProjects(state, { payload }) {
      return {
        ...state,
        projectData: payload.data,
      };
    },
    get(state, { payload }) {
      return {
        ...state,
        inspwayData: payload.data,
      };
    },
    add(state, { payload }) {
      return {
        ...state,
        inspway:payload.data
      };
    },
    delete(state, { payload }) {
      return {
        ...state,
        inspway:payload.data
      };
    },

    getSelectName(state, { payload }) {
      return {
        ...state,
        selectModelName: payload.data,
      };
    },

    downloadFromTemp(state, { payload }) {
      return {
        ...state,
        downloadTempResult: payload.data,
      };
    },



  },
};
