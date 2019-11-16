import {uploadFile} from '@/services/Company';

export default {
  namespace: 'company',
  state: {
    // data: [],
  },
  effects: {
    *uploadFile({ payload,callback }, { call, put }) {
      const response = yield call(uploadFile, payload);
      if (callback) callback(response);
    },
  },

  reducers: {
    /*
    save(state, { payload }) {
      return {
        ...state,
        data: payload.data,
      };
    }, */




  }

};
