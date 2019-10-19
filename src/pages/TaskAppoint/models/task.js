import { queryAllTaskAndCustomers,queryAllTaskAndInspects ,queryCustomers,queryInspects,queryAllInspmans,
  dealTask,dealnspect,updateTask,updateInspect,dealnspman,updateInspman} from '@/services/Task';

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

    taskInspman:{
      list: [],
      pagination: {},
    },


    dealCustomers:[],
    updateCustomers:{},


    dealInspects:[],
    updateInspects:{},

    dealInspman:[],
    updateInspman:{},


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

    *queryInspmans({ payload,callback }, { call, put }) {
      const response = yield call(queryAllInspmans, payload);
      yield put({
        type: 'queryInspmansInfo',
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

    *getCustomers({ payload,callback }, { call, put }) {
      const response = yield call(queryCustomers, payload);
      yield put({
        type: 'getTask',
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

    *dealInspmans({ payload,callback }, { call, put }) {
      const response = yield call(dealnspman, payload);
      yield put({
        type: 'dealnspmanInfo',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *updateInspmans({ payload,callback }, { call, put }) {
      const response = yield call(updateInspman, payload);
      yield put({
        type: 'updateInspmanInfo',
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

    queryInspmansInfo(state, { payload }) {
      return {
        ...state,
        taskInspman: payload.data,
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

    dealnspmanInfo(state, { payload }) {
      return {
        ...state,
        dealInspman: payload.data,
      };
    },


    updateInspmanInfo(state, { payload }) {
      return {
        ...state,
        updateInspman: payload.data,
      };
    },



  },
};
