
import {getAllCNASCheckMan,addCNASCheckMan,deleteCNASCheckMan,getCNASCheckManForAdd} from '@/services/CNASCheckMan';
import {getAllCNASCheckStandard,addCNASCheckStandard,deleteCNASCheckStandard,getCNASCheckStandardForAdd} from '@/services/CNASCheckStandard';

export default {
  namespace: 'cnascheck',
  state: {

  },
  effects: {

    *getAllCNASCheckMan({ payload,callback }, { call, put }) {
      const response = yield call(getAllCNASCheckMan, payload);
      if (callback) callback(response.data);
    },
    *addCNASCheckMan({ payload,callback }, { call, put }) {
      const response = yield call(addCNASCheckMan, payload);
      if (callback) callback(response.data);
    },

    *deleteCNASCheckMan({ payload,callback }, { call, put }) {
      const response = yield call(deleteCNASCheckMan, payload);
      if (callback) callback(response.data);
    },
    *getCNASCheckManForAdd({ payload,callback }, { call, put }) {
      const response = yield call(getCNASCheckManForAdd, payload);
      if (callback) callback(response.data);
    },


    *getAllCNASCheckStandard({ payload,callback }, { call, put }) {
      const response = yield call(getAllCNASCheckStandard, payload);
      if (callback) callback(response.data);
    },
    *addCNASCheckStandard({ payload,callback }, { call, put }) {
      const response = yield call(addCNASCheckStandard, payload);
      if (callback) callback(response.data);
    },

    *deleteCNASCheckStandard({ payload,callback }, { call, put }) {
      const response = yield call(deleteCNASCheckStandard, payload);
      if (callback) callback(response.data);
    },
    *getCNASCheckStandardForAdd({ payload,callback }, { call, put }) {
      const response = yield call(getCNASCheckStandardForAdd, payload);
      if (callback) callback(response.data);
    },

  },

  reducers: {

  }

};
