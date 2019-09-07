import { getAllArchives} from '@/services/Archives';

export default {
  namespace: 'archives',
  state: {
    data: [],
  },
  effects: {
    *fetch({ payload,callback }, { call, put }) {
      const response = yield call(getAllArchives, payload);
      yield put({
        type: 'save',
        payload: response,
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



  }

};
