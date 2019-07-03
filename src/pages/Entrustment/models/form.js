import { fakeSubmitForm } from '@/services/api';

export default {
  namespace: 'Entrustment',
  state:{
    data:[

    ]
  },

  effects: {
    *submitApplicationForm({ payload }, { call, put }) {
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'submitApplicationForm',
        payload,
      });
    },
  },

  reducers: {
    submitApplicationForm(form, { payload }) {
      return {
        ...form,
        data:payload
      };
    },
  },
}
