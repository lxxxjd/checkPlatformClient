import request from '@/utils/request';
import { stringify } from 'qs';

// 查看文件名是否重复
export async function getRepeatRecordName(params) {
  return request(`/api/recordinfo/getRepeatRecordName`,{
    method: 'POST',
    data: params,
  });
}



export async function getRecordCompanyList(params) {
  return request(`/api/RecordCompany/getRecordCompanyList`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function uploadRecordCompany(params) {
  return request(`/api/RecordCompany/uploadRecordCompany`,{
    method: 'POST',
    data:params,
  });
}

export async function deleteRecordCompany(params) {
  return request(`/api/RecordCompany/deleteRecordCompany`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function getRepeatRecordNameCompany(params) {
  return request(`/api/RecordCompany/getRepeatRecordNameCompany`,{
    method: 'POST',
    data:params,
  });
}



export async function getPdfByOssPath(params) {
  return request(`/api/cert_report/get_pdf?osspath=${params.osspath}`);
}



