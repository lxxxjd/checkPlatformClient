import { queryAllTask ,queryCustomers,dealTask,updateTask} from '@/services/Task';

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

    dealCustomers:[],
    updateCustomers:{},
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

    *dealTask({ payload,callback }, { call, put }) {
      const response = yield call(dealTask, payload);
      yield put({
        type: 'dealTaskInfo',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *updateTask({ payload,callback }, { call, put }) {
      const response = yield call(updateTask, payload);
      yield put({
        type: 'updateTaskInfo',
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

    dealTaskInfo(state, { payload }) {
      return {
        ...state,
        dealCustomers: payload.data,
      };
    },

    updateTaskInfo(state, { payload }) {
      return {
        ...state,
        updateCustomers: payload.data,
      };
    },


  },
};
