import request from '@/utils/request';
import { stringify } from 'qs';


export async function getPreCustomReceiveList(params) {
  return request(`/api/PreCustomReceive/getPreCustomReceiveList`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addPreCustomReceive(params) {
  if (params.customsname !== undefined && params.customsname !== null ) {
    params.customsname = params.customsname[1];
  }
  return request(`/api/PreCustomReceive/addPreCustomReceive`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updatePreCustomReceive(params) {
  if (params.customsname !== undefined && params.customsname !== null ) {
    params.customsname = params.customsname[1];
  }
  return request(`/api/PreCustomReceive/updatePreCustomReceive`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deletePreCustomReceive(params) {
  return request(`/api/PreCustomReceive/deletePreCustomReceive`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}



export async function getCustomReceiveList(params) {
  return request(`/api/CustomReceive/getCustomReceiveList`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addCustomReceive(params) {
  return request(`/api/CustomReceive/addCustomReceive`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateCustomReceive(params) {
  return request(`/api/CustomReceive/updateCustomReceive`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteCustomReceive(params) {
  return request(`/api/CustomReceive/deleteCustomReceive`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}
