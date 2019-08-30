import request from '@/utils/request';
import { stringify } from 'qs';


export async function getAllList(params) {
  return request(`/api/list/getAllList`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function getReports(params) {
  return request(`/api/list/getReports`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function addList(params) {
  return request(`/api/list/addList`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

