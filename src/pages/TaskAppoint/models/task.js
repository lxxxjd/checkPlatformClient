import { queryAllTaskAndCustomers,queryAllTaskAndInspects ,queryCustomers,queryInspects,
  dealTask,dealnspect,updateTask,updateInspect} from '@/services/Task';

export default {
  namespace: 'task',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    dataInspect: {
      list: [],
      pagination: {},
    },
    taskCustomers:{
      list: [],
      pagination: {},
    },

    taskInspects:{
      list: [],
      pagination: {},
    },


    dealCustomers:[],
    updateCustomers:{},


    dealInspects:[],
    updateInspects:{},

  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryAllTaskAndCustomers, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchInspect({ payload }, { call, put }) {
      const response = yield call(queryAllTaskAndInspects, payload);
      yield put({
        type: 'saveInspect',
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

    *getInspects({ payload,callback }, { call, put }) {
      const response = yield call(queryInspects, payload);
      yield put({
        type: 'getInspectsInfo',
        payload: response,
      });
      if (callback) callback(response.data);
    },



    *dealnspect({ payload,callback }, { call, put }) {
      const response = yield call(dealnspect, payload);
      yield put({
        type: 'dealnspectInfo',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *updateInspect({ payload,callback }, { call, put }) {
      const response = yield call(updateInspect, payload);
      yield put({
        type: 'updateInspectInfo',
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

    saveInspect(state, { payload }) {
      return {
        ...state,
        dataInspect: payload.data,
      };
    },

    getTask(state, { payload }) {
      return {
        ...state,
        taskCustomers: payload.data,
      };
    },
    getInspectsInfo(state, { payload }) {
      return {
        ...state,
        taskInspects: payload.data,
      };
    },

    updateTaskInfo(state, { payload }) {
      return {
        ...state,
        updateCustomers: payload.data,
      };
    },


    dealTaskInfo(state, { payload }) {
      return {
        ...state,
        dealCustomers: payload.data,
      };
    },

    updateInspectInfo(state, { payload }) {
      return {
        ...state,
        updateInspects: payload.data,
      };
    },


    dealnspectInfo(state, { payload }) {
      return {
        ...state,
        dealInspects: payload.data,
      };
    },



  },
};
