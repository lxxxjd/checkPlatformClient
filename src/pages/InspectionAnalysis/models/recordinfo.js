import { getRepeatRecordName } from '@/services/Recordinfo';

export default {
  namespace: 'InspectionAnalysis_testRecord',
  state: {

  },

  effects: {

    // 文件名查重
    *getRepeatRecordName({ payload , callback}, { call, put }) {
      const response = yield call(getRepeatRecordName, payload);
      if (callback) callback(response.data);
    },

  },

  reducers: {

  }
};
