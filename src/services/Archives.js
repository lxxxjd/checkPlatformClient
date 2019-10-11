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


export async function updateReport(params) {
  return request(`/api/report/update_report`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}





