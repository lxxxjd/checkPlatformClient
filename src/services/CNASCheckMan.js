import request from '@/utils/request';
import { stringify } from 'qs';

// getAllCNASCheckMan,addCNASCheckMan,deleteCNASCheckMan,getCNASCheckManForAdd
export async function getAllCNASCheckMan(params) {
  return request(`/api/CNASCheckMan/getAllCNASCheckMan`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function addCNASCheckMan(params) {
  return request(`/api/CNASCheckMan/addCNASCheckMan`,{
    method: 'POST',
    data: params,
  });
}
export async function deleteCNASCheckMan(params) {
  return request(`/api/CNASCheckMan/deleteCNASCheckMan`,{
    method: 'POST',
    data: params,
  });
}


export async function getCNASCheckManForAdd(params) {
  return request(`/api/CNASCheckMan/getCNASCheckManForAdd`,{
    method: 'POST',
    data: params,
  });
}




