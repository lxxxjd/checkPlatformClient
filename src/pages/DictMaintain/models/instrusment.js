import { addInstrument,getInstrument,deleteInstrument,updateInstrument, getInstrumentRecord, uploadInstrumentRecord, deleteInstrumentRecord, getUrl} from '@/services/Intrusment';



export default {
  namespace: 'intrusment',
  state: {
    addInstrumentResult:{},getInstrumentResult:{},deleteInstrumentResult:{},updateInstrumentResult:{},
  },
  effects: {

    *updateInstrument({ payload,callback }, { call, put }) {
      const response = yield call(updateInstrument, payload);
      yield put({
        type: 'updateInstrumentResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *getUrl({ payload,callback }, { call, put }) {
      const response = yield call(getUrl, payload);
      if (callback) callback(response);
    },
    *deleteInstrumentRecord({ payload,callback }, { call, put }) {
      const response = yield call(deleteInstrumentRecord, payload);
      if (callback) callback(response);
    },
    *uploadInstrumentRecord({ payload,callback }, { call, put }) {
      const response = yield call(uploadInstrumentRecord, payload);
      if (callback) callback(response);
    },
    *getInstrumentRecord({ payload,callback }, { call, put }) {
      const response = yield call(getInstrumentRecord, payload);
      if (callback) callback(response);
    },


    *addInstrument({ payload,callback }, { call, put }) {
      const response = yield call(addInstrument, payload);
      yield put({
        type: 'addInstrumentResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    *getInstrumentList({ payload,callback }, { call, put }) {
      const response = yield call(getInstrument, payload);
      yield put({
        type: 'getInstrumentResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    *deleteInstrument({ payload,callback }, { call, put }) {
      const response = yield call(deleteInstrument, payload);
      yield put({
        type: 'deleteInstrumentResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },



  },

  reducers: {

    addInstrumentResult(state, { payload }) {
      return {
        ...state,
        addInstrumentResult: payload.data,
      };
    },

    getInstrumentResult(state, { payload }) {
      return {
        ...state,
        getInstrumentResult: payload.data,
      };
    },

    deleteInstrumentResult(state, { payload }) {
      return {
        ...state,
        deleteInstrumentResult: payload.data,
      };
    },


    updateInstrumentResult(state, { payload }) {
      return {
        ...state,
        updateInstrumentResult: payload.data,
      };
    },


  }

};
