import request from '@/utils/request';
import { stringify } from 'qs';

// 数据统计-业务收入-查询
export async function selectBusinessIncomesByConditions(params){
  return request('/api/report/selectBusinessIncomesByConditions', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 数据统计-业务收入-查询总额
export async function selectBusinessIncomeTotalByConditions(params){
  return request('/api/report/selectBusinessIncomeTotalByConditions', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 数据统计-业务收入-导出
export async function downloadBusinessIncomesAsExcelByConditions(params){
  return request('/api/template/downloadBusinessIncomesAsExcelByConditions', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


// 数据统计-成本统计-查询
// eslint-disable-next-line import/prefer-default-export
export async function selectReportPriceMakingByConditions(params) {
  return request('/api/report/selectReportPriceMakingByConditions', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 数据统计-利润分析-查询
export async function selectReportPriceMakingByConditionsWithProfit(params){
  return request('/api/report/selectProfitAnalysis', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


