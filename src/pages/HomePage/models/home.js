import {saveResultList} from '@/services/TestRecord'

export default {
  namespace: 'home',
  state: {

  },

  effects: {
    *saveResultList({ payload,callback }, { call, put }) {
      const response = yield call(saveResultList, payload);
      if (callback) callback(response.data);
    },
  },

  reducers: {

  },
};
