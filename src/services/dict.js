import request from '@/utils/request';
import { stringify } from 'qs';


export async function getCargos(params) {
  return request(`/api/cargo/get_cargos?certCode=${params.certCode}`);
}

export async function searchCargos(params) {
  return request(`/api/cargo/search_cargos?certCode=${params.certCode}&value=${params.value}`);
}

export async function deleteCargo(params) {
  return request(`/api/cargo/delete_cargo?keyno=${params.keyno}`);
}

export async function updateCargo(params) {
  return request('/api/cargo/update_cargo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}


export async function getItemList(params) {
  return request(`/api/testItem/getItemList?certCode=${params.certCode}&cargoname=${params.cargoname}`);
}

export async function addCargo(params) {
  return request('/api/cargo/add_cargo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}