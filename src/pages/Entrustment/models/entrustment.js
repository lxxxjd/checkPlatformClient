import { submitApplication ,queryAllReports,queryAllReportsByFilter,
        queryReport,cancelReportItem,getAllClientName,getAllBusinessSort,
        getAllBusinessSource,getTradeWay,getCheckProject,getCargos,updateReport,getContacts,searchCargos,
  getCnasInfo,getCnasCheckInfo,getDepartmentList,getCustomInfos,getRepeatCustomsNo,getBusiness, addConfigorAuthority,getPortList,
  searchPortForEntrustment,searchByKindValue,searchPlaceByPlaceCode,getPriceMaking
} from '@/services/Entrustment';

import {
  getPerTaskReportnos
} from '@/services/Task';


export default {
  namespace: 'entrustment',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    report:{},
    clientName:[],
    businessSort:[],
    businessSource:[],
    tradeway: [],
    cargos: [],
    copyNo:'',
    deleteResult:null,
    checkProject:[],
    preMainInfoList:[],
  },

  effects: {

    *getPriceMaking({ payload , callback}, { call, put }) {
      const response = yield call(getPriceMaking, payload);
      if (callback) callback(response);
    },

    *getPerTaskReportnos({ payload , callback}, { call, put }) {
      const response = yield call(getPerTaskReportnos, payload);
      if (callback) callback(response);
    },

    // 报关号查重
    *getRepeatCustomsNo({ payload , callback}, { call, put }) {
      const response = yield call(getRepeatCustomsNo, payload);
      if (callback) callback(response.data);
    },


    // 受理
    *addConfigorAuthority({ payload , callback}, { call, put }) {
      const response = yield call(addConfigorAuthority, payload);
      if (callback) callback(response);
    },

    // 工商接口
    *getBusiness({ payload , callback}, { call, put }) {
      const response = yield call(getBusiness, payload);
      if (callback) callback(response.data);
    },

    *fetch({ payload , callback}, { call, put }) {
      const response = yield call(queryAllReports, payload);
      if (callback) callback(response);
    },

    *getDepartmentList({ payload , callback}, { call, put }) {
      const response = yield call(getDepartmentList, payload);
      if (callback) callback(response);
    },
    *getCustomInfos({ payload , callback}, { call, put }) {
      const response = yield call(getCustomInfos, payload);
      if (callback) callback(response);
    },
    *addReport({ payload, callback }, { call, put }) {
      const response = yield call(submitApplication, payload);
      yield put({
        type: 'submit',
        payload,
      });
      if (callback) callback(response);
    },
    *filter({ payload }, { call, put }) {
      const response = yield call(queryAllReportsByFilter, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *getPortList({ payload,callback }, { call, put }) {
      const response = yield call(getPortList, payload);
      if (callback) callback(response);
    },

    *searchByKindValue({ payload,callback }, { call, put }) {
      const response = yield call(searchByKindValue, payload);
      if (callback) callback(response);
    },

    *searchPlaceByPlaceCode({ payload,callback }, { call, put }) {
      const response = yield call(searchPlaceByPlaceCode, payload);
      if (callback) callback(response);
    },


    *searchPortForEntrustment({ payload,callback }, { call, put }) {
      const response = yield call(searchPortForEntrustment, payload);
      if (callback) callback(response);
    },


    *getReport({ payload,callback }, { call, put }) {
      const response = yield call(queryReport, payload);
      yield put({
        type: 'get',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *getClientName({ payload ,callback}, { call, put }) {
      const response = yield call(getAllClientName, payload);
      yield put({
        type: 'getName',
        payload:response,
      });
      if (callback) callback(response.data);
    },
    *getBusinessSort({ payload,callback }, { call, put }) {
      const response = yield call(getAllBusinessSort, payload);
      yield put({
        type: 'getBusinessName',
        payload:response,
      });
      if (callback) callback(response.data);
    },
    *getBusinessSource({ payload,callback }, { call, put }) {
      const response = yield call(getAllBusinessSource, payload);
      yield put({
        type: 'getBusinessSourceName',
        payload:response,
      });
      if (callback) callback(response.data);
    },

    *getCheckProject({ payload,callback }, { call, put }) {
      const response = yield call(getCheckProject, payload);
      yield put({
        type: 'getCheckProjectName',
        payload:response,
      });
      if (callback) callback(response.data);
    },

    *getTradeWay({ payload ,callback}, { call, put }) {
      const response = yield call(getTradeWay, payload);
      yield put({
        type: 'getTradeWayName',
        payload:response,
      });
      if (callback) callback(response.data);
    },

    *updateReport({ payload, callback }, { call, put }) {
      const response = yield call(updateReport, payload);
      yield put({
        type: 'update',
        payload:response,
      });
      if (callback) callback(response);
    },

    *getCargos({ payload ,callback}, { call, put }) {
      const response = yield call(getCargos, payload);
      yield put({
        type: 'getCargosName',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *searchCargos({ payload ,callback}, { call, put }) {
      const response = yield call(searchCargos, payload);
      yield put({
        type: 'getCargosName',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(cancelReportItem, payload);
      if (callback) callback(response);
    },
    *getContacts({ payload, callback }, { call, put }) {
      const response = yield call(getContacts, payload);
      if (callback) callback(response);
    },
    *getCnasInfo({ payload ,callback}, { call, put }) {
      const response = yield call(getCnasInfo, payload);
      if (callback) callback(response);
    },
    *getCnasCheckInfo({ payload ,callback}, { call, put }) {
      const response = yield call(getCnasCheckInfo, payload);
      if (callback) callback(response);
    },
  },

  reducers: {
    submit(state, { payload }) {
      return {
        ...state,
        report: payload.data,
      };
    },
    update(state, { payload }) {
      return {
        ...state,
        report: payload.data,
      };
    },
    get(state, { payload }) {
      return {
        ...state,
        report: payload.data,
      };
    },
    getName(state, { payload }) {
      return {
        ...state,
        clientName: payload.data,
      };
    },
    getCheckProjectName(state, { payload }) {
      return {
        ...state,
        checkProject: payload.data,
      };
    },
    getBusinessName(state, { payload }) {
      return {
        ...state,
        businessSort: payload.data,
      };
    },
    getBusinessSourceName(state, { payload }) {
      return {
        ...state,
        businessSource: payload.data,
      };
    },

    getTradeWayName(state, { payload }) {
      return {
        ...state,
        tradeway: payload.data,
      };
    },
    getCargosName(state, { payload }) {
      return {
        ...state,
        tradeway: payload.data,
      };
    },

    save(state, {payload}) {
      return {
        ...state,
        data: payload.data,
      };
    },
    delete(state, { payload }) {
      return {
        ...state,
        deleteResult: payload,
      };
    },
  },
};
