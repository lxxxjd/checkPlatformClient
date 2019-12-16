import request from '@/utils/request';
import { stringify } from 'qs';


export async function getAllReadRecords(params) {
  return request(`/api/readrecord/getAllReadRecords`,{
    method: 'POST',
    data: params,
  });
}

