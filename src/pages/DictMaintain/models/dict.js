import {getCargos , searchCargos, updateCargo, addCargo, deleteCargo} from '@/services/dict';

export default {
  namespace: 'dict',
  state: {
    cargos: [],
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
    *updateCargo({ payload,callback }, { call, put }) {
      const response = yield call(updateCargo, payload);
      if (callback) callback(response);
    },
    *addCargo({ payload,callback }, { call, put }) {
      const response = yield call(addCargo, payload);
      if (callback) callback(response);
    },
    *deleteCargo({ payload,callback }, { call, put }) {
      const response = yield call(deleteCargo, payload);
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




  }

};
