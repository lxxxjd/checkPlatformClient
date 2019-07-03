import { submitApplication } from '@/services/Entrustment';

export default {
  namespace: 'Entrustment',
  state: {
    data: [],
  },

  effects: {
    *submitApplication({ payload, callback }, { call, put }) {
      const response = yield call(submitApplication, payload);
      yield put({
        type: 'submit',
        payload,
      });
      if (callback) callback();
    },
  },

  reducers: {
    submit(state, { action }) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
