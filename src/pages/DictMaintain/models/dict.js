import {getCargos , searchCargos, updateCargo, addCargo, deleteCargo, getItemList, searchItemList , addItem, updateItem, deleteItem, getTestStandard, updateTestStandard, addTestStandard, deleteTestStandard} from '@/services/dict';
import {  getCheckProjectList,addCheckProject,updateCheckProject,deleteCheckProject} from '@/services/CheckProject';
export default {
  namespace: 'dict',
  state: {
    cargos: [],
    items:[],
    standards:[],

    // 检验项目管理

    getCheckProjectListResult:{},
    addCheckProjectResult:{},
    updateCheckProjectResult:{},
    deleteCheckProjectResult:{},

  },
  effects: {
    *getCargos({ payload,callback }, { call, put }) {
      const response = yield call(getCargos, payload);
      yield put({
        type: 'getCargo',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *searchCargos({ payload,callback }, { call, put }) {
      const response = yield call(searchCargos, payload);
      yield put({
        type: 'getCargo',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *getItemList({ payload,callback }, { call, put }) {
      const response = yield call(getItemList, payload);
      yield put({
        type: 'getItem',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *searchItemList({ payload,callback }, { call, put }) {
      const response = yield call(searchItemList, payload);
      yield put({
        type: 'getItem',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *getTestStandard({ payload,callback }, { call, put }) {
      const response = yield call(getTestStandard, payload);
      yield put({
        type: 'getStandard',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *updateCargo({ payload,callback }, { call, put }) {
      const response = yield call(updateCargo, payload);
      if (callback) callback(response);
    },
    *addCargo({ payload,callback }, { call, put }) {
      const response = yield call(addCargo, payload);
      if (callback) callback(response);
    },
    *addItem({ payload,callback }, { call, put }) {
      const response = yield call(addItem, payload);
      if (callback) callback(response);
    },
    *updateItem({ payload,callback }, { call, put }) {
      const response = yield call(updateItem, payload);
      if (callback) callback(response);
    },
    *deleteCargo({ payload,callback }, { call, put }) {
      const response = yield call(deleteCargo, payload);
      if (callback) callback(response);
    },
    *deleteItem({ payload,callback }, { call, put }) {
      const response = yield call(deleteItem, payload);
      if (callback) callback(response);
    },
    *deleteTestStandard({ payload,callback }, { call, put }) {
      const response = yield call(deleteTestStandard, payload);
      if (callback) callback(response);
    },
    *updateTestStandard({ payload,callback }, { call, put }) {
      const response = yield call(updateTestStandard, payload);
      if (callback) callback(response);
    },
    *addTestStandard({ payload,callback }, { call, put }) {
      const response = yield call(addTestStandard, payload);
      if (callback) callback(response);
    },


    // 检验项目管理管理

    *getCheckProjectList({ payload,callback }, { call, put }) {
      const response = yield call(getCheckProjectList, payload);
      yield put({
        type: 'getCheckProjectListResult',
        payload: response,
      });
      if (callback) callback(response);
    },

    *addCheckProject({ payload,callback }, { call, put }) {
      const response = yield call(addCheckProject, payload);
      yield put({
        type: 'addCheckProjectResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },


    *updateCheckProject({ payload,callback }, { call, put }) {
      const response = yield call(updateCheckProject, payload);
      yield put({
        type: 'updateCheckProjectResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },


    *deleteCheckProject({ payload,callback }, { call, put }) {
      const response = yield call(deleteCheckProject, payload);
      yield put({
        type: 'deleteCheckProjectResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },


  },

  reducers: {

    getCargo(state, { payload }) {
      return {
        ...state,
        cargos: payload.data,
      };
    },
    getItem(state, { payload }) {
      return {
        ...state,
        items: payload.data,
      };
    },
    getStandard(state, { payload }) {
      return {
        ...state,
        standards: payload.data,
      };
    },

    // 检验项目字典
    getCheckProjectListResult(state, { payload }) {
      return {
        ...state,
        getCheckProjectListResult: payload,
      };
    },

    addCheckProjectResult(state, { payload }) {
      return {
        ...state,
        addCheckProjectResult: payload.data,
      };
    },

    updateCheckProjectResult(state, { payload }) {
      return {
        ...state,
        updateCheckProjectResult: payload.data,
      };
    },

    deleteCheckProjectResult(state, { payload }) {
      return {
        ...state,
        deleteCheckProjectResult: payload.data,
      };
    },

  }

};
