import request from '@/utils/request';
import { stringify } from 'qs';

export async function getPortList(params) {
  return request(`/api/port/getPortList`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addPort(params) {
  return request(`/api/port/addPort`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updatePort(params) {
  return request(`/api/port/updatePort`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deletePort(params) {
  return request(`/api/port/deletePort`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}


