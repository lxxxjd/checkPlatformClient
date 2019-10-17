import { getAllList,getReports,addList,deleteBylistno,getReportListBylistno,passListFiction,getCosts,getCostInfos ,addCost} from '@/services/Charge';
import { getAllClientName } from '@/services/Entrustment';

export default {
  namespace: 'charge',
  state: {
    data: [],
    reports:[], // listAdd reports
    addresult:{},  // 添加返回值
    deleteinfo:{}, // 删除返回信息
    reportByListno:[], // 按listno 返回所有report
    passListFictionResult:{}, // 审核返回值
    costData:[],  // 成本信息
    costInfoData:[],  // 成本信息
    costAddResult:{}, // 添加成本返回信息
  },
  effects: {
    *fetch({ payload,callback }, { call, put }) {
      const response = yield call(getAllList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *getReportsFetch({ payload,callback }, { call, put }) {
      const response = yield call(getReports, payload);
      yield put({
        type: 'saveReports',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    *addListFetch({ payload,callback }, { call, put }) {
      const response = yield call(addList, payload);
      yield put({
        type: 'saveAddList',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    *deleteBylistnoFetch({ payload,callback }, { call, put }) {
      const response = yield call(deleteBylistno, payload);
      yield put({
        type: 'saveDeleteBylistno',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    *getReportListBylistnoFetch({ payload,callback }, { call, put }) {
      const response = yield call(getReportListBylistno, payload);
      yield put({
        type: 'saveReportListByListno',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    // 审核通过
    *passListFictionFetch({ payload,callback }, { call, put }) {
      const response = yield call(passListFiction, payload);
      yield put({
        type: 'savePassListFiction',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    // 成本信息
    *getCostsFetch({ payload,callback }, { call, put }) {
      const response = yield call(getCosts, payload);
      yield put({
        type: 'saveGetCostsFetch',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    // 成本信息
    *getCostInfosFetch({ payload,callback }, { call, put }) {
      const response = yield call(getCostInfos, payload);
      yield put({
        type: 'saveGetCostInfosFetch',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    // 添加成本信息
    *addCostFetch({ payload,callback }, { call, put }) {
      const response = yield call(addCost, payload);
      yield put({
        type: 'saveAddCost',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    // 付款公司
    *getClientName({ payload ,callback}, { call, put }) {
      const response = yield call(getAllClientName, payload);
      yield put({
        type: 'getName',
        payload:response,
      });
      if (callback) callback(response.data);
    },

  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        data: payload.data,
      };
    },

    saveReports(state, { payload }) {
      return {
        ...state,
        reports: payload.data,
      };
    },

    saveAddList(state, { payload }) {
      return {
        ...state,
        addresult: payload.data,
      };
    },

    saveDeleteBylistno(state, { payload }) {
      return {
        ...state,
        deleteinfo: payload.data,
      };
    },

    saveReportListByListno(state, { payload }) {
      return {
        ...state,
        reportByListno: payload.data,
      };
    },

    savePassListFiction(state, { payload }) {
      return {
        ...state,
        passListFictionResult: payload.data,
      };
    },

    saveGetCostsFetch(state, { payload }) {
      return {
        ...state,
        costData: payload.data,
      };
    },

    saveGetCostInfosFetch(state, { payload }) {
      return {
        ...state,
        costInfoData: payload.data,
      };
    },

    saveAddCost(state, { payload }) {
      return {
        ...state,
        costAddResult: payload.data,
      };
    },

    getName(state, { payload }) {
      return {
        ...state,
        clientName: payload.data,
      };
    },

  }

};
