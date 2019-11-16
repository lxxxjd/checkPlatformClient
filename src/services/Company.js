import request from '@/utils/request';
import { stringify } from 'qs';



export async function getAllArchives(params) {
  return request(`/api/archives/getAllArchives`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteTestBySampleNo(params) {
  return request(`/api/TestInfo/deleteAssign?keyno=${params.keyno}&reportno=${params.reportno}&sampleno=${params.sampleno}`);
}



