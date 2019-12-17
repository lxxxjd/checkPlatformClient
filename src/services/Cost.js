import request from '@/utils/request';
import { stringify } from 'qs';


export async function getAllCost(params) {
  return request('/api/cost/getAllCost', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 高级查询
export async function selectCostByConditions(params) {
  return request('/api/cost/selectCostByConditions', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

