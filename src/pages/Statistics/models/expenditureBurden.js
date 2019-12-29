import {selectCostListsByConditions, selectCostListTotalByConditions} from '@/services/Costlist';

export default {
  namespace: 'expenditureBurden',
  state: {
    selectCostListsByConditionsResult: [],
    selectCostListTotalByConditionsResult: {}
  },

  effects: {

    * selectCostListsByConditions({ payload, callback }, {call, put }){
      const response = yield call(selectCostListsByConditions, payload);
      yield put({
          type: 'selectCostListsByConditionsResult',
          payload: response
        }
      );
      if(callback) callback(response.data);
    },

    * selectCostListTotalByConditions({payload, callback}, {call, put}){
      const response =yield call(selectCostListTotalByConditions, payload);
      yield put({
        type: 'selectCostListTotalByConditionsResult',
        payload: response
      });
      if(callback) callback(response.data);
    },

  },

  reducers: {
    selectCostListsByConditionsResult(state, { payload }){
      return {
        ...state,
        selectCostListsByConditionsResult: payload.data,
      };
    },

    selectCostListTotalByConditionsResult(state, {payload}){
      return {
        ...state,
        selectCostListTotalByConditionsResult: payload.data,
      };
    },

  },


}
