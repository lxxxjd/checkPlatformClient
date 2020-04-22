import request from '@/utils/request';
import { stringify } from 'qs';
import { formatMessage } from 'umi-plugin-react/locale';
// addInstrument,getInstrument,deleteInstrument

export async function updateInstrument(params) {
  return request(`/api/instrument/updateInstrument`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function getRepeatInstrument(params) {
  return request(`/api/instrument/getRepeatInstrument`,{
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

export async function deleteInstrumentRecord(params) {
  return request(`/api/recordinstrument/deleteRecord?keyno=${params.keyno}`);
}

export async function getInstrumentRecord(params) {
  return request(`/api/recordinstrument/getRecord`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function uploadInstrumentRecord(params) {
    return request(`/api/recordinstrument/uploadRecord`,{
    method: 'POST',
    // headers: { 'Content-Type': 'multipart/form-data;'},
    data:params,
  });
}
export async function getUrl(params) {
  return request(`/api/cert_report/get_pdf?osspath=${params.url}`);
}
