import { getAllPremaininfosByCerCode, getPremaininfo, getPreRecord, getOssPdf,copyPremaininfoToMaininfo} from '@/services/PreMainInfo';

export default {
  	namespace: 'preMainInfo',
  	state: {
    	preMainInfoList:[],
    	preRecordData:[],
  	},
  	effects: {
  		*getAllPremaininfosByCerCode({ payload }, { call, put }) {
	      	const response = yield call(getAllPremaininfosByCerCode, payload);
	      	yield put({
	        	type: 'getAllPremaininfos',
	        	payload: response,
	      	});
	    },
	    *getPremaininfo({ payload ,callback}, { call, put }) {
	      	const response = yield call(getPremaininfo, payload);
	      	if (callback) callback(response);
	    },
	    *getOssPdf({ payload ,callback}, { call, put }) {
	      	const response = yield call(getOssPdf, payload);
	      	if (callback) callback(response);
	    },
	   	*copyPremaininfoToMaininfo({ payload ,callback}, { call, put }) {
	      	const response = yield call(copyPremaininfoToMaininfo, payload);
	      	if (callback) callback(response);
	    },
	    *getPreRecord({ payload ,callback}, { call, put }) {
      		const response = yield call(getPreRecord, payload);
      		yield put({
        		type: 'getPreRecords',
        		payload: response,
      		});
      		if (callback) callback(response);
   	 	},

  	},
  	reducers: {
  		getAllPremaininfos(state, { payload }) {
	      	return {
	        	...state,
	        	preMainInfoList: payload.data,
	        };
    	},
    	getPreRecords(state, { payload }) {
	      	return {
	        	...state,
	        	preRecordData: payload.data,
	        };
    	},
	}
}