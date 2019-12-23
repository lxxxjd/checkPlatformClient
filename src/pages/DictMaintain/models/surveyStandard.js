import {  addSurveryStandard,deleteSurveyStandard,getSurveyStandard,updateSurveystandard} from '@/services/SurveyStandard';


export default {
  namespace: 'standard',
  state: {
    addSurveryStandardResult:{},getSurveyStandardResult:{},deleteSurveyStandardResult:{},updateSurveystandardResult:{},
  },
  effects: {

    *updateSurveystandard({ payload,callback }, { call, put }) {
      const response = yield call(updateSurveystandard, payload);
      yield put({
        type: 'updateSurveystandardResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    *addSurveryStandard({ payload,callback }, { call, put }) {
      const response = yield call(addSurveryStandard, payload);
      yield put({
        type: 'addSurveryStandardResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    *getSurveyStandard({ payload,callback }, { call, put }) {
      const response = yield call(getSurveyStandard, payload);
      yield put({
        type: 'getSurveyStandardResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    *deleteSurveyStandard({ payload,callback }, { call, put }) {
      const response = yield call(deleteSurveyStandard, payload);
      yield put({
        type: 'deleteSurveyStandardResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },



  },

  reducers: {

    addSurveryStandardResult(state, { payload }) {
      return {
        ...state,
        addSurveryStandardResult: payload.data,
      };
    },

    getSurveyStandardResult(state, { payload }) {
      return {
        ...state,
        getSurveyStandardResult: payload.data,
      };
    },

    deleteSurveyStandardResult(state, { payload }) {
      return {
        ...state,
        deleteSurveyStandardResult: payload.data,
      };
    },

    updateSurveystandardResult(state, { payload }) {
      return {
        ...state,
        deleteSurveyStandardResult: payload.data,
      };
    },


  }

};
