// eslint-disable-next-line no-unused-vars
import {selectReportPriceMakingByConditions, selectReportPriceMakingByConditionsWithProfit} from '@/services/Report';

export default{
  namespace: "report",
  state: {
    selectReportPriceMakingByConditionsResult:[],
    selectReportPriceMakingByConditionsWithProfitResult:[]
  },

  effects: {
    *selectReportPriceMakingByConditions({ payload,callback}, { call, put}){
      const response = yield call(selectReportPriceMakingByConditions, payload);
      yield put({
          type: 'selectReportPriceMakingByConditionsResult',
          payload: response
        }
      );
      if(callback) callback(response.data);
    },

    *selectReportPriceMakingByConditionsWithProfit({ payload, callback}, { call, put}){
      const response = yield call(selectReportPriceMakingByConditionsWithProfit, payload);
      yield put({
          type: 'selectReportPriceMakingByConditionsWithProfitResult',
          payload: response
        }
      );
      if(callback) callback(response.data);
    },
  },

  reducers: {
    selectReportPriceMakingByConditionsResult(state, { payload }){
      return {
        ...state,
        selectReportPriceMakingByConditionsResult: payload.data,
      };
    },

    selectReportPriceMakingByConditionsWithProfitResult(state, { payload }){
      return {
        ...state,
        selectReportPriceMakingByConditionsWithProfitResult: payload.data,
      }
    }
  }
}
