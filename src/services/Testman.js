import request from '@/utils/request';
import { stringify } from 'qs';

// getTestmanList,addTestman,updateTestman,deleteTestman
export async function getTestmanList(params) {
  return request(`/api/testman/getTestmanList`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addTestman(params) {
  return request(`/api/testman/addTestman`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateTestman(params) {
  return request(`/api/testman/updateTestman`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteTestman(params) {
  return request(`/api/testman/deleteTestman`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}


