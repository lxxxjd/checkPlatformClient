import {getAllUserListByCertCode,getDepartmentList} from '@/services/Company';

export default {
  namespace: 'company',
  state: {
    userListData:[],
    // 部门管理
    departListResult:{},


  },
  effects: {

    *getAllUserListByCertCode({ payload,callback }, { call, put }) {
      const response = yield call(getAllUserListByCertCode, payload);
      yield put({
        type: 'getAllUserListByCertCodeResult',
        payload: response,
      });
      if (callback) callback(response);
    },

    // 部门管理
    *getDepartmentList({ payload,callback }, { call, put }) {
      const response = yield call(getDepartmentList, payload);
      yield put({
        type: 'getDepartmentListResult',
        payload: response,
      });
      if (callback) callback(response);
    },



  },

  reducers: {

    getAllUserListByCertCodeResult(state, { payload }) {
      return {
        ...state,
        userListData: payload,
      };
    },



    getDepartmentListResult(state, { payload }) {
      return {
        ...state,
        departListResult: payload,
      };
    },





  }

};
