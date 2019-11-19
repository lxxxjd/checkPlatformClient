import {getCargos , searchCargos, updateCargo, addCargo, deleteCargo, getItemList, searchItemList , addItem, updateItem, deleteItem, getTestStandard, updateTestStandard, addTestStandard, deleteTestStandard} from '@/services/dict';
import {  getCheckProjectList,addCheckProject,updateCheckProject,deleteCheckProject} from '@/services/CheckProject';
import { getBusinessSortList,addBusinessSort,updateBusinessSort,deleteBusinessSort, getBusinessSourceList,addBusinessSource,updateBusinessSource,deleteBusinessSource }from '@/services/Business';
import { getInvoiceTitleList,addInvoiceTitle,updateInvoiceTitle,deleteInvoiceTitle} from '@/services/InvoiceTitle';

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

    // 业务分类和业务来源
    getBusinessSortListResult:{},
    addBusinessSortResult:{},
    updateBusinessSortResult:{},
    deleteBusinessSortResult:{},

    getBusinessSourceListResult:{},
    addBusinessSourceResult:{},
    updateBusinessSourceResult:{},
    deleteBusinessSourceResult:{},

    // 发票

    getInvoiceTitleListResult:{},
    addInvoiceTitleResult:{},
    updateInvoiceTitleResult:{},
    deleteInvoiceTitleResult:{},



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

    // 业务分类
    *getBusinessSortList({ payload,callback }, { call, put }) {
      const response = yield call(getBusinessSortList, payload);
      yield put({
        type: 'getBusinessSortListResult',
        payload: response,
      });
      if (callback) callback(response);
    },

    // 业务分类
    *addBusinessSort({ payload,callback }, { call, put }) {
      const response = yield call(addBusinessSort, payload);
      yield put({
        type: 'addBusinessSortResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    // 业务分类
    *updateBusinessSort({ payload,callback }, { call, put }) {
      const response = yield call(updateBusinessSort, payload);
      yield put({
        type: 'updateBusinessSortResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    // 业务分类
    *deleteBusinessSort({ payload,callback }, { call, put }) {
      const response = yield call(deleteBusinessSort, payload);
      yield put({
        type: 'deleteBusinessSortResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    // 业务来源
    *getBusinessSourceList({ payload,callback }, { call, put }) {
      const response = yield call(getBusinessSourceList, payload);
      yield put({
        type: 'getBusinessSourceListResult',
        payload: response,
      });
      if (callback) callback(response);
    },
    *addBusinessSource({ payload,callback }, { call, put }) {
      const response = yield call(addBusinessSource, payload);
      yield put({
        type: 'addBusinessSourceResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *updateBusinessSource({ payload,callback }, { call, put }) {
      const response = yield call(updateBusinessSource, payload);
      yield put({
        type: 'updateBusinessSourceResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *deleteBusinessSource({ payload,callback }, { call, put }) {
      const response = yield call(deleteBusinessSource, payload);
      yield put({
        type: 'deleteBusinessSortResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    // 开发票
    *getInvoiceTitleList({ payload,callback }, { call, put }) {
      const response = yield call(getInvoiceTitleList, payload);
      yield put({
        type: 'getInvoiceTitleListResult',
        payload: response,
      });
      if (callback) callback(response);
    },
    *addInvoiceTitle({ payload,callback }, { call, put }) {
      const response = yield call(addInvoiceTitle, payload);
      yield put({
        type: 'addInvoiceTitleResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *updateInvoiceTitle({ payload,callback }, { call, put }) {
      const response = yield call(updateInvoiceTitle, payload);
      yield put({
        type: 'updateInvoiceTitleResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *deleteInvoiceTitle({ payload,callback }, { call, put }) {
      const response = yield call(deleteInvoiceTitle, payload);
      yield put({
        type: 'deleteInvoiceTitleResult',
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
    getBusinessSortListResult(state, { payload }) {
      return {
        ...state,
        getBusinessSortListResult: payload,
      };
    },


    addBusinessSortResult(state, { payload }) {
      return {
        ...state,
        addBusinessSortResult: payload.data,
      };
    },

    updateBusinessSortResult(state, { payload }) {
      return {
        ...state,
        updateBusinessSortResult: payload.data,
      };
    },

    deleteBusinessSortResult(state, { payload }) {
      return {
        ...state,
        deleteBusinessSortResult: payload.data,
      };
    },

    getBusinessSourceListResult(state, { payload }) {
      return {
        ...state,
        getBusinessSourceListResult: payload,
      };
    },


    addBusinessSourceResult(state, { payload }) {
      return {
        ...state,
        addBusinessSourceResult: payload.data,
      };
    },

    updateBusinessSourceResult(state, { payload }) {
      return {
        ...state,
        updateBusinessSourceResult: payload.data,
      };
    },

    deleteBusinessSourceResult(state, { payload }) {
      return {
        ...state,
        deleteBusinessSourceResult: payload.data,
      };
    },

    getInvoiceTitleListResult(state, { payload }) {
      return {
        ...state,
        getInvoiceTitleListResult: payload,
      };
    },


    addInvoiceTitleResult(state, { payload }) {
      return {
        ...state,
        addInvoiceTitleResult: payload.data,
      };
    },

    updateInvoiceTitleResult(state, { payload }) {
      return {
        ...state,
        updateInvoiceTitleResult: payload.data,
      };
    },

    deleteInvoiceTitleResult(state, { payload }) {
      return {
        ...state,
        deleteInvoiceTitleResult: payload.data,
      };
    },

  }

};
