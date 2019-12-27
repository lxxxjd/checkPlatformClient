import request from '@/utils/request';
import { stringify } from 'qs';


export async function getCostlistList(params) {
  return request(`/api/costlist/getCostlistList`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addCostlist(params) {
  return request(`/api/costlist/addCostlist`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateCostlist(params) {
  return request(`/api/costlist/updateCostlist`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteCostlist(params) {
  return request(`/api/costlist/deleteCostlist`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function getCostBylistNO(params) {
  return request(`/api/costlist/getCostBylistNO`,{
    method: 'POST',
    data: params,
  });
}

