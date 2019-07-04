import request from '@/utils/request';
import { stringify } from 'qs';

export async function submitApplication(params) {
  return request('/api/Entrustment/add', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function queryAllReports(params) {
  return request(`/api/report/getAllReports?${stringify(params)}`);
}
