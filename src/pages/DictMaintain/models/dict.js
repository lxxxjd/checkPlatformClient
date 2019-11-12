import {getCargos , searchCargos, updateCargo, addCargo, deleteCargo, getItemList, searchItemList , addItem, updateItem, deleteItem, getTestStandard, updateTestStandard, addTestStandard, deleteTestStandard} from '@/services/dict';

export default {
  namespace: 'dict',
  state: {
    cargos: [],
    items:[],
    standards:[],
  },
  effects: {
    *getCargos({ payload,callback }, { call, put }) {
      const response = yield call(getCargos, payload);
      yield put({
        type: 'getCargo',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *searchCargos({ payload,callback }, { call, put }) {
      const response = yield call(searchCargos, payload);
      yield put({
        type: 'getCargo',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *getItemList({ payload,callback }, { call, put }) {
      const response = yield call(getItemList, payload);
      yield put({
        type: 'getItem',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *searchItemList({ payload,callback }, { call, put }) {
      const response = yield call(searchItemList, payload);
      yield put({
        type: 'getItem',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *getTestStandard({ payload,callback }, { call, put }) {
      const response = yield call(getTestStandard, payload);
      yield put({
        type: 'getStandard',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *updateCargo({ payload,callback }, { call, put }) {
      const response = yield call(updateCargo, payload);
      if (callback) callback(response);
    },
    *addCargo({ payload,callback }, { call, put }) {
      const response = yield call(addCargo, payload);
      if (callback) callback(response);
    },
    *addItem({ payload,callback }, { call, put }) {
      const response = yield call(addItem, payload);
      if (callback) callback(response);
    },
    *updateItem({ payload,callback }, { call, put }) {
      const response = yield call(updateItem, payload);
      if (callback) callback(response);
    },
    *deleteCargo({ payload,callback }, { call, put }) {
      const response = yield call(deleteCargo, payload);
      if (callback) callback(response);
    },
    *deleteItem({ payload,callback }, { call, put }) {
      const response = yield call(deleteItem, payload);
      if (callback) callback(response);
    },
    *deleteTestStandard({ payload,callback }, { call, put }) {
      const response = yield call(deleteTestStandard, payload);
      if (callback) callback(response);
    },
    *updateTestStandard({ payload,callback }, { call, put }) {
      const response = yield call(updateTestStandard, payload);
      if (callback) callback(response);
    },
    *addTestStandard({ payload,callback }, { call, put }) {
      const response = yield call(addTestStandard, payload);
      if (callback) callback(response);
    },
  },

  reducers: {
    
    getCargo(state, { payload }) {
      return {
        ...state,
        cargos: payload.data,
      };
    }, 
    getItem(state, { payload }) {
      return {
        ...state,
        items: payload.data,
      };
    }, 
    getStandard(state, { payload }) {
      return {
        ...state,
        standards: payload.data,
      };
    }, 


  }

};
