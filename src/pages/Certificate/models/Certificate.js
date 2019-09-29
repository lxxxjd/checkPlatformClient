import {} from '@/services/InspectionAnalysis'



export default {
  namespace: 'certificate',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    recordData:[],
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
  },

  reducers: {
    getSampleRegisterInfo(state, { payload }) {
      return {
        ...state,
        data: payload.data,
      };
    },
  },
};
