
import {getCNASCheckFourCertCodeListInfo} from '@/services/cnas';

export default {
  namespace: 'cnas',
  state: {

    getCNASCheckFourCertCodeListInfoResult:{},
  },
  effects: {

    *getCNASCheckFourCertCodeListInfo({ payload,callback }, { call, put }) {
      const response = yield call(getCNASCheckFourCertCodeListInfo, payload);
      yield put({
        type: 'getCNASCheckFourCertCodeListInfoResult',
        payload: response,
      });
      if (callback) callback(response);
    },


  },

  reducers: {

    getCNASCheckFourCertCodeListInfoResult(state, { payload }) {
      return {
        ...state,
        getCNASCheckFourCertCodeListInfoResult: payload.data,
      };
    },

  }

};
