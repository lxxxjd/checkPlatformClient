import request from '@/utils/request';
import { stringify } from 'qs';



export async function uploadFile(params) {
    return request(`/api/recordinfo/upload`,{
    method: 'POST',
    // headers: { 'Content-Type': 'multipart/form-data;'},
    data:params,
  });
}

export async function deleteTestBySampleNo(params) {
  return request(`/api/TestInfo/deleteAssign?keyno=${params.keyno}&reportno=${params.reportno}&sampleno=${params.sampleno}`);
}



