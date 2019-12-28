import {selectListInfosByConditions, selectListInfoTotalByConditions} from '@/services/ListInfo';

export default {
  namespace: 'incomeDistribution',
  state: {
    selectListInfosByConditionsResult: [],
    selectListInfoTotalByConditionsResult: {}
  },

  effects: {

    * selectListInfosByConditions({ payload, callback }, { call, put }) {
      const response = yield call(selectListInfosByConditions, payload);
      yield put({
          type: 'selectListInfosByConditionsResult',
          payload: response
        }
      );
      if (callback) callback(response.data);
    },

    * selectListInfoTotalByConditions({ payload, callback}, { call, put }) {
      const response = yield call(selectListInfoTotalByConditions, payload);
      yield put({
          type: 'selectListInfoTotalByConditionsResult',
          payload: response
        }
      );
      if(callback) callback(response.data);
    },

  },

  reducers: {

    selectListInfosByConditionsResult(state, { payload }){
      return {
        ...state,
        selectListInfosByConditionsResult: payload.data,
      };
    },

    selectListInfoTotalByConditionsResult(state, { payload }){
      return {
        ...state,
        selectListInfoTotalByConditionsResult: payload.data,
      };
    }

  },

}
