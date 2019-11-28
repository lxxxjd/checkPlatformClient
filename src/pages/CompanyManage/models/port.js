import {getPortList,addPort,updatePort,deletePort } from '@/services/Port';

export default {
  namespace: 'port',
  state: {
    getPortListResult:{},
    addPortResult:{},
    updatePortResult:{},
    deletePortResult:{},
  },
  effects: {


    *getPortList({ payload,callback }, { call, put }) {
      const response = yield call(getPortList, payload);
      yield put({
        type: 'getDepartmentListResult',
        payload: response,
      });
      if (callback) callback(response);
    },

    *addPort({ payload,callback }, { call, put }) {
      const response = yield call(addPort, payload);
      yield put({
        type: 'addDepartmentResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },


    *updatePort({ payload,callback }, { call, put }) {
      const response = yield call(updatePort, payload);
      yield put({
        type: 'updateDepartmentResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },


    *deletePort({ payload,callback }, { call, put }) {
      const response = yield call(deletePort, payload);
      yield put({
        type: 'deleteDepartmentResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },

  },

  reducers: {

    getPortListResult(state, { payload }) {
      return {
        ...state,
        getPortListResult: payload,
      };
    },

    addPortResult(state, { payload }) {
      return {
        ...state,
        addPortResult: payload.data,
      };
    },

    updatePortResult(state, { payload }) {
      return {
        ...state,
        updatePortResult: payload.data,
      };
    },

    deletePortResult(state, { payload }) {
      return {
        ...state,
        deletePortResult: payload.data,
      };
    },



  }

};
