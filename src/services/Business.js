import request from '@/utils/request';
import { stringify } from 'qs';


export async function getBusinessSortList(params) {
  return request(`/api/business_sort/getBusinessSortList`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addBusinessSort(params) {
  return request(`/api/business_sort/addBusinessSort`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateBusinessSort(params) {
  return request(`/api/business_sort/updateBusinessSort`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteBusinessSort(params) {
  return request(`/api/business_sort/deleteBusinessSort`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function getBusinessSourceList(params) {
  return request(`/api/business_source/getBusinessSourceList`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addBusinessSource(params) {
  return request(`/api/business_source/addBusinessSource`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function updateBusinessSource(params) {
  return request(`/api/business_source/updateBusinessSource`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}



export async function deleteBusinessSource(params) {
  return request(`/api/business_source/deleteBusinessSource`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

