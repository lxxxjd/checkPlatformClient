import {getAllSampleRegister,getSampleRegistersByReportNo ,
  addSamleRegister,deleteSamleRegister,selectSampleRegisterByConditions,selectSampleByConditionsDestory} from '@/services/Sample'



export default {
  namespace: 'sample',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    sampleDetail:{
      list: [],
      pagination: {},
    },

    addData:{},
    deleteResult:{},
    selectRegisterResult:{
      list: [],
      pagination: {},
    },
    selectRegisterDestory:{
      list: [],
      pagination: {},
    },
  },

  effects: {
    *getSampleRegister({ payload,callback }, { call, put }) {
      const response = yield call(getAllSampleRegister, payload);
      yield put({
        type: 'getSampleRegisterInfo',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    *getSampleRegistersByReportNo({ payload,callback }, { call, put }) {
      const response = yield call(getSampleRegistersByReportNo, payload);
      yield put({
        type: 'getByReportNo',
        payload: response,
      });
      if (callback) callback(response.data);
    },



    *addSamleRegister({ payload,callback }, { call, put }) {
      const response = yield call(addSamleRegister, payload);
      yield put({
        type: 'addRegister',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    *deleteSamleRegister({ payload,callback }, { call, put }) {
      const response = yield call(deleteSamleRegister, payload);
      yield put({
        type: 'deleteRegister',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    *getSampleRegisterByConditions({ payload,callback }, { call, put }) {
      const response = yield call(selectSampleRegisterByConditions, payload);
      yield put({
        type: 'selectRegisterByConditions',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *selectSampleByConditionsDestory({ payload,callback }, { call, put }) {
      const response = yield call(selectSampleByConditionsDestory, payload);
      yield put({
        type: 'selectByConditionsDestory',
        payload: response,
      });
      if (callback) callback(response.data);
    },

  },

  reducers: {
    getSampleRegisterInfo(state, { payload }) {
      return {
        ...state,
        data: payload.data,
      };
    },

    getByReportNo(state, { payload }) {
      return {
        ...state,
        sampleDetail: payload.data,
      };
    },

    addRegister(state, { payload }) {
      return {
        ...state,
        addData: payload.data,
      };
    },
    deleteRegister(state, { payload }) {
      return {
        ...state,
        deleteResult: payload.data,
      };
    },
    selectRegisterByConditions(state, { payload }) {
      return {
        ...state,
        selectRegisterResult: payload.data,
      };
    },

    selectByConditionsDestory(state, { payload }) {
      return {
        ...state,
        selectRegisterDestory: payload.data,
      };
    },


  },
};
