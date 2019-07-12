import { queryAllTask ,queryCustomers} from '@/services/Task';

export default {
  namespace: 'task',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    taskCustomers:{
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryAllTask, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *getCustomers({ payload,callback }, { call, put }) {
      const response = yield call(queryCustomers, payload);
      yield put({
        type: 'getTask',
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
    getTask(state, { payload }) {
      return {
        ...state,
        taskCustomers: payload.data,
      };
    },
  },
};
