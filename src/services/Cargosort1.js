import request from '@/utils/request';
import { stringify } from 'qs';


export async function getCargosort1List(params) {
  return request(`/api/cargoSort1/get_cargosort1List`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

