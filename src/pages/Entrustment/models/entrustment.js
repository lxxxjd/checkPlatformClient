import { submitApplication } from '@/services/Entrustment';

export default {
  namespace: 'entrustment',
  state: {
    data: [],
  },

  effects: {
    *add({ payload, callback }, { call, put }) {
      const response = yield call(submitApplication, payload);
      yield put({
        type: 'submit',
        payload,
      });
      if (callback) callback();
    },
  },

  reducers: {
    submit(state, { payload }) {
      return {
        ...state,
        data: payload,
      };
    },
  },
};
