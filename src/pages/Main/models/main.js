import { getReportNumDay, getBillTotalDay, getBillTotalMonth, getBillTotalYear,
  getPayTotalYear, getPerTask, getPerApprove, getTotalPay} from '@/services/Main';
import { getCostListByPayListNo} from '@/services/Costlist';
import { getListBylistno} from '@/services/ListInfo';

export default {
  namespace: 'main',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {

    *getCostListByPayListNo({ payload,callback }, { call, put }) {
      const response = yield call(getCostListByPayListNo, payload);
      if (callback) callback(response.data);
    },

    *getListBylistno({ payload,callback }, { call, put }) {
      const response = yield call(getListBylistno, payload);
      if (callback) callback(response.data);
    },

    *getReportNumDay({ payload,callback }, { call, put }) {
      const response = yield call(getReportNumDay, payload);
      if (callback) callback(response);
    },
    *getBillTotalDay({ payload,callback }, { call, put }) {
      const response = yield call(getBillTotalDay, payload);
      if (callback) callback(response);
    },
    *getBillTotalMonth({ payload,callback }, { call, put }) {
      const response = yield call(getBillTotalMonth, payload);
      if (callback) callback(response);
    },
    *getBillTotalYear({ payload,callback }, { call, put }) {
      const response = yield call(getBillTotalYear, payload);
      if (callback) callback(response);
    },
    *getPayTotalYear({ payload,callback }, { call, put }) {
      const response = yield call(getPayTotalYear, payload);
      if (callback) callback(response);
    },
    *getPerTask({ payload,callback }, { call, put }) {
      const response = yield call(getPerTask, payload);
      if (callback) callback(response);
    },
    *getPerApprove({ payload,callback }, { call, put }) {
      const response = yield call(getPerApprove, payload);
      if (callback) callback(response);
    },
    *getTotalPay({ payload,callback }, { call, put }) {
      const response = yield call(getTotalPay, payload);
      if (callback) callback(response);
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
