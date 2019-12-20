import { getReportNumDay, getBillTotalDay, getBillTotalMonth, getBillTotalYear, getPayTotalYear, getPerTask, getPerApprove} from '@/services/Main';

export default {
  namespace: 'main',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
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
