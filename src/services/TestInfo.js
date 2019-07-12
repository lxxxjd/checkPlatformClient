import request from '@/utils/request';
import { stringify } from 'qs';
export async function getTestInfo(params) {
  return request(`/api/TestInfo/getTestInfo`,{
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
export async function queryReport(params) {
  return request(`/api/report/getAllReports`,{
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
export async function getAllClientName(params) {
  if(params.content != null){
    return request(`/api/client/getAllClientName?content=${params.content}`);
  }
  return request('/api/client/getAllClientName');
}