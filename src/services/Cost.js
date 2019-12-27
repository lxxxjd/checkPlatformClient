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

// 查询
export async function selectCostByConditions(params) {
  return request('/api/cost/selectCostByConditions', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addList(params) {
  return request('/api/costlist/addList', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

