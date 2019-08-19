import request from '@/utils/request';
import { stringify } from 'qs';


// eslint-disable-next-line import/prefer-default-export
export async function getAllList(params) {
  return request(`/api/list/getAllList`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
