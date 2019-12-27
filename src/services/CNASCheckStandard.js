import request from '@/utils/request';
import { stringify } from 'qs';

// getAllCNASCheckStandard,addCNASCheckStandard,deleteCNASCheckStandard,getCNASCheckStandardForAdd
export async function getAllCNASCheckStandard(params) {
  return request(`/api/CNASCheckStandard/getAllCNASCheckStandard`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function addCNASCheckStandard(params) {
  return request(`/api/CNASCheckStandard/addCNASCheckStandard`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function deleteCNASCheckStandard(params) {
  return request(`/api/CNASCheckStandard/deleteCNASCheckStandard`,{
    method: 'POST',
    data: params,
  });
}

export async function getCNASCheckStandardForAdd(params) {
  return request(`/api/CNASCheckStandard/getCNASCheckStandardForAdd`,{
    method: 'POST',
    data: params,
  });
}


