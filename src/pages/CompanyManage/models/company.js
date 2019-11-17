import {uploadFile,getAllUserListByCertCode,checkUserName,updateUser,addUser,deleteUser} from '@/services/Company';

export default {
  namespace: 'company',
  state: {
    // data: [],
    userListData:[],
    checkUserNameResult:{},
    updateUserResult:{},
    addUserResult:{},
    deleteUserResult:{},
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


  }

};
