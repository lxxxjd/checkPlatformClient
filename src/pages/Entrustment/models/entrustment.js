import { submitApplication ,queryAllReports} from '@/services/Entrustment';

export default {
  namespace: 'Entrustment',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryAllReports, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
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
    save(state, action) {
      return {
        ...state,
        data: action.payload.data,
      };
    },
  },
};
