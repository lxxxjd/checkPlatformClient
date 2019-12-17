import request from '@/utils/request';
import { stringify } from 'qs';


// 高级查询
// eslint-disable-next-line import/prefer-default-export
export async function selectReportPriceMakingByConditions(params) {
  return request('/api/report/selectReportPriceMakingByConditions', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function selectReportPriceMakingByConditionsWithProfit(params){
  return request('/api/report/selectProfitAnalysis', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

