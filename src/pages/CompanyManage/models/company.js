import {uploadFile,getAllUserListByCertCode,checkUserName,updateUser,addUser,deleteUser,
  getDepartmentList,addDepartment,updateDepartment,deleteDepartment, } from '@/services/Company';

export default {
  namespace: 'company',
  state: {
    // data: [],
    userListData:[],
    checkUserNameResult:{},
    updateUserResult:{},
    addUserResult:{},
    deleteUserResult:{},

    // 部门管理
    departListResult:{},
    addDepartResult:{},
    updateDepartResult:{},
    deleteDepartResult:{},

    // 检验项目管理

    getCheckProjectListResult:{},
    addCheckProjectResult:{},
    updateCheckProjectResult:{},
    deleteCheckProjectResult:{},

  },
  effects: {
    *uploadFile({ payload,callback }, { call, put }) {
      const response = yield call(uploadFile, payload);
      if (callback) callback(response);
    },

    *getAllUserListByCertCode({ payload,callback }, { call, put }) {
      const response = yield call(getAllUserListByCertCode, payload);
      yield put({
        type: 'getAllUserListByCertCodeResult',
        payload: response,
      });
      if (callback) callback(response);
    },


    // 检测用户名重复
    *checkUserNameFetch({ payload,callback }, { call, put }) {
      const response = yield call(checkUserName, payload);
      yield put({
        type: 'getCheckUserNameResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    *updateUser({ payload,callback }, { call, put }) {
      const response = yield call(updateUser, payload);
      yield put({
        type: 'getUpdateUserResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    *addUser({ payload,callback }, { call, put }) {
      const response = yield call(addUser, payload);
      yield put({
        type: 'getAddUserResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },


     *deleteUser({ payload,callback }, { call, put }) {
      const response = yield call(deleteUser, payload);
      yield put({
        type: 'getDeleteUserResult',
        payload: response,
      });
      if (callback) callback(response.data);
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

    *addDepartment({ payload,callback }, { call, put }) {
      const response = yield call(addDepartment, payload);
      yield put({
        type: 'addDepartmentResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },


    *updateDepartment({ payload,callback }, { call, put }) {
      const response = yield call(updateDepartment, payload);
      yield put({
        type: 'updateDepartmentResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },


    *deleteDepartment({ payload,callback }, { call, put }) {
      const response = yield call(deleteDepartment, payload);
      yield put({
        type: 'deleteDepartmentResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },










  },

  reducers: {
    /*
    save(state, { payload }) {
      return {
        ...state,
        data: payload.data,
      };
    }, */


    getAllUserListByCertCodeResult(state, { payload }) {
      return {
        ...state,
        userListData: payload,
      };
    },

    getCheckUserNameResult(state, { payload }) {
      return {
        ...state,
        checkUserNameResult: payload.data,
      };
    },


    getUpdateUserResult(state, { payload }) {
      return {
        ...state,
        updateUserResult: payload.data,
      };
    },

    // getAddUserResult
    getAddUserResult(state, { payload }) {
      return {
        ...state,
        addUserResult: payload.data,
      };
    },

    getDeleteUserResult(state, { payload }) {
      return {
        ...state,
        deleteUserResult: payload.data,
      };
    },


    getDepartmentListResult(state, { payload }) {
      return {
        ...state,
        departListResult: payload,
      };
    },

    addDepartmentResult(state, { payload }) {
      return {
        ...state,
        addDepartResult: payload.data,
      };
    },

    updateDepartmentResult(state, { payload }) {
      return {
        ...state,
        updateDepartResult: payload.data,
      };
    },

    deleteDepartmentResult(state, { payload }) {
      return {
        ...state,
        deleteDepartResult: payload.data,
      };
    },



  }

};
