import { getAllList} from '@/services/Charge';

export default {
  namespace: 'charge',
  state: {
    data: [],
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
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        data: payload.data,
      };
    },
  },

};
