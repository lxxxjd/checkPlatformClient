import {selectCostByConditions,addList} from '@/services/Cost'



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

    *addList({ payload,callback}, { call, put}){
      const response = yield call(addList, payload);
      if(callback) callback(response.data);
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
