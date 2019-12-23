import request from '@/utils/request';
import { stringify } from 'qs';

// addInstrument,getInstrument,deleteInstrument

export async function updateInstrument(params) {
  return request(`/api/instrument/updateInstrument`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addInstrument(params) {
  return request(`/api/instrument/addInstrument`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function getInstrument(params) {
  return request(`/api/instrument/getInstrument`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// deleteInstrument
export async function deleteInstrument(params) {
  return request(`/api/instrument/deleteInstrument`,{
    method: 'POST',
    data: params,
  });
}

