import {selectBusinessIncomesByConditions, selectBusinessIncomeTotalByConditions,
  downloadBusinessIncomesAsExcelByConditions,downloadFile,selectBusinessIncomesByConditionsInit} from '@/services/Report';

export default {
  namespace: 'businessIncome',
  state: {
    selectBusinessIncomesByConditionsResult: [],
    selectBusinessIncomeTotalByConditionsResult: {}
  },

  effects: {



    * selectBusinessIncomesByConditions({payload, callback}, {call, put}){
      const response = yield call(selectBusinessIncomesByConditions, payload);
      yield put({
          type: 'selectBusinessIncomesByConditionsResult',
          payload: response
        }
      );
      if(callback) callback(response.data);
    },

    * selectBusinessIncomesByConditionsInit({payload, callback}, {call, put}){
      const response = yield call(selectBusinessIncomesByConditionsInit, payload);
      if(callback) callback(response.data);
    },


    * selectBusinessIncomeTotalByConditions({payload, callback}, {call, put}){
      const response = yield call(selectBusinessIncomeTotalByConditions, payload);
      yield put({
        type: 'selectBusinessIncomeTotalByConditionsResult',
        payload: response
      });
      if(callback) callback(response.data);
    },

    * downloadBusinessIncomesAsExcelByConditions({payload, callback}, {call, put}){
      const response = yield call(downloadBusinessIncomesAsExcelByConditions, payload);
      if(callback) callback(response);
    },

    * downloadFile({payload, callback}, {call, put}){
      const response = yield call(downloadFile, payload);
      if(callback) callback(response);
    },




  },

  reducers: {

    selectBusinessIncomesByConditionsResult(state, {payload}){
      return {
        ...state,
        selectBusinessIncomesByConditionsResult: payload.data,
      };
    },

    selectBusinessIncomeTotalByConditionsResult(state, {payload}){
      return {
        ...state,
        selectBusinessIncomeTotalByConditionsResult: payload.data,
      };
    },

    downloadBusinessIncomesAsExcelByConditionsResult(state, {payload}){
      return {
        ...state,
        selectBusinessIncomesByConditionsResult: payload.data,
      };
    },

  },

}
