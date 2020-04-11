import {selectCostByConditions,selectCostByConditionsSumMoney} from '@/services/Cost'



export default {
  namespace: 'cost',
  state: {
    selectCostByConditionsResult:[]
  },

  effects: {


    *selectCostByConditions({ payload,callback}, { call, put}){
      const response = yield call(selectCostByConditions, payload);
      yield put({
          type: 'selectCostByConditionsResult',
          payload: response
        }
      );
      if(callback) callback(response.data);
    },

    *selectCostByConditionsSumMoney({ payload,callback}, { call, put}){
      const response = yield call(selectCostByConditionsSumMoney, payload);
      if(callback) callback(response);
    },


  },

  reducers: {

    selectCostByConditionsResult(state, { payload }){
      return {
        ...state,
        selectCostByConditionsResult: payload.data,
      };
    },

  },
};
