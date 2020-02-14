import {uploadFile,getAllUserListByCertCode,checkUserName,updateUser,addUser,deleteUser,
  getDepartmentList,addDepartment,updateDepartment,deleteDepartment, getCompany,getUrl,uploadSeal,uploadDocumentHead,uploadUserSeal,updateCompany,getParent
  , getManRecord, uploadManRecord, deleteManRecord, getUser, uploadUserAuthor,verityUserNameC} from '@/services/Company';

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
    *deleteManRecord({ payload,callback }, { call, put }) {
      const response = yield call(deleteManRecord, payload);
      if (callback) callback(response);
    },
    *getUser({ payload,callback }, { call, put }) {
      const response = yield call(getUser, payload);
      if (callback) callback(response);
    },
    *uploadUserAuthor({ payload,callback }, { call, put }) {
      const response = yield call(uploadUserAuthor, payload);
      if (callback) callback(response);
    },
    *uploadManRecord({ payload,callback }, { call, put }) {
      const response = yield call(uploadManRecord, payload);
      if (callback) callback(response);
    },
    *getManRecord({ payload,callback }, { call, put }) {
      const response = yield call(getManRecord, payload);
      if (callback) callback(response);
    },
    *uploadFile({ payload,callback }, { call, put }) {
      const response = yield call(uploadFile, payload);
      if (callback) callback(response);
    },

    *uploadSeal({ payload,callback }, { call, put }) {
      const response = yield call(uploadSeal, payload);
      if (callback) callback(response);
    },

    *updateCompany({ payload,callback }, { call, put }) {
      const response = yield call(updateCompany, payload);
      if (callback) callback(response);
    },
    *getParent({ payload,callback }, { call, put }) {
      const response = yield call(getParent, payload);
      if (callback) callback(response);
    },
    *uploadUserSeal({ payload,callback }, { call, put }) {
      const response = yield call(uploadUserSeal, payload);
      if (callback) callback(response);
    },
    *uploadDocumentHead({ payload,callback }, { call, put }) {
      const response = yield call(uploadDocumentHead, payload);
      if (callback) callback(response);
    },
    *getCompany({ payload,callback }, { call, put }) {
      const response = yield call(getCompany, payload);
      if (callback) callback(response);
    },

    *getUrl({ payload,callback }, { call, put }) {
      const response = yield call(getUrl, payload);
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

    // 检测 用户名姓名重复
    *verityUserNameC({ payload,callback }, { call, put }) {
      const response = yield call(verityUserNameC, payload);
      if (callback) callback(response.data);
    },


    *updateUser({ payload,callback }, { call, put }) {
      const response = yield call(updateUser, payload);
      if (callback) callback(response);
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
