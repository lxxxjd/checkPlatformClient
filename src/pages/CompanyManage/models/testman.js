import {getTestmanList,addTestman,updateTestman,deleteTestman } from '@/services/Testman';

export default {
  namespace: 'testman',
  state: {
    getTestmanListResult:{},
    addTestmanResult:{},
    updateTestmanResult:{},
    deleteTestmanResult:{},
  },
  effects: {


    *getTestmanList({ payload,callback }, { call, put }) {
      const response = yield call(getTestmanList, payload);
      yield put({
        type: 'getDepartmentListResult',
        payload: response,
      });
      if (callback) callback(response);
    },

    *addTestman({ payload,callback }, { call, put }) {
      const response = yield call(addTestman, payload);
      yield put({
        type: 'addDepartmentResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },


    *updateTestman({ payload,callback }, { call, put }) {
      const response = yield call(updateTestman, payload);
      yield put({
        type: 'updateDepartmentResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },


    *deleteTestman({ payload,callback }, { call, put }) {
      const response = yield call(deleteTestman, payload);
      yield put({
        type: 'deleteDepartmentResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },

  },

  reducers: {

    getTestmanListResult(state, { payload }) {
      return {
        ...state,
        getTestmanListResult: payload,
      };
    },

    addTestmanResult(state, { payload }) {
      return {
        ...state,
        addTestmanResult: payload.data,
      };
    },

    updateTestmanResult(state, { payload }) {
      return {
        ...state,
        updateTestmanResult: payload.data,
      };
    },

    deleteTestmanResult(state, { payload }) {
      return {
        ...state,
        deleteTestmanResult: payload.data,
      };
    },



  }

};
