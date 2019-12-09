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

