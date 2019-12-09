import {getAllCost} from '@/services/Cost'



export default {
  namespace: 'cost',
  state: {
    getAllCostResult:[],
  },

  effects: {
    *getAllCost({ payload,callback }, { call, put }) {
      const response = yield call(getAllCost, payload);
      yield put({
        type: 'getAllCostResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },


  },

  reducers: {
    getAllCostResult(state, { payload }) {
      return {
        ...state,
        getAllCostResult: payload.data,
      };
    },


  },
};
