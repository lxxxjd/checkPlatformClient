// 导入接口文件，并采用解构的方式，
// 将newPage.js的文件里面的queryUser1赋值给这里的queryUser1
import { queryUser1,queryCertificate} from "@/services/Certificate";

export default {
  namespace: "Certificate",

  //  State 是储存数据的地方，收到 Action 以后，会更新数据。
  state: {
    data: {},
    list:[]
  },

  effects: {
    /**
     * @param payload 参数
     * @param call 执行异步函数调用接口
     * @param put 发出一个 Action，类似于 dispatch 将服务端返回的数据传递给上面的state
     * @returns {IterableIterator<*>}
     */* fetch({ payload }, { call, put }) {
      // 访问之前可以做一些操作
      const response = yield call(queryUser1, payload);
      // 拿到数据之后可以做一些操作
      yield put({
        // 这行对应下面的reducers处理函数名字
        type: "save",
        // 这是将最后的处理数据传递给下面的reducers函数
        payload: response
      });
    },

    // * fetch2({ payload }, { call, put }) {
    //   const response = yield call(queryCurrent);
    //   yield put({
    //     type: "saveCurrentUser",
    //     payload: response
    //   });
    // }

    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryCertificate, payload);
      yield put({
        type: 'queryCertificateList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    /**
     *
     * @param state
     * @param action
     * @returns {{[p: string]: *}}
     */
    save(state, action) {
      console.log(action);
      return {
        ...state, // es6三点运算符合，有点模糊解释不清楚
        data: action.payload // 上面与服务器交互完的数据赋值给data,这里的data 对应最上面 state 里面的data
      };
    },
    queryCertificateList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  }
};
