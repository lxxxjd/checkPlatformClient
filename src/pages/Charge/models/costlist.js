import {getCostlistList,addCostlist,updateCostlist,deleteCostlist,getCostBylistNO} from '@/services/Costlist'



export default {
  namespace: 'costlist',
  state: {
    selectCostByConditionsResult:[]
  },

  effects: {


    *getCostlistList({ payload,callback}, { call, put}){
      const response = yield call(getCostlistList, payload);
      if(callback) callback(response);
    },

    *addCostlist({ payload,callback}, { call, put}){
      const response = yield call(addCostlist, payload);
      if(callback) callback(response.data);
    },

    *updateCostlist({ payload,callback}, { call, put}){
      const response = yield call(updateCostlist, payload);
      if(callback) callback(response.data);
    },
    *deleteCostlist({ payload,callback}, { call, put}){
      const response = yield call(deleteCostlist, payload);
      if(callback) callback(response.data);
    },

    *getCostBylistNO({ payload,callback}, { call, put}){
      const response = yield call(getCostBylistNO, payload);
      if(callback) callback(response.data);
    },


  },

  reducers: {

  },
};
