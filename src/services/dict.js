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
  return request(`/api/testItem/getItemList?cargoname=${params.cargoname}&certCode=${params.certCode}`);
}

export async function getTestStandard(params) {
  return request(`/api/TestStandard/getTestStandard?cargoname=${params.cargoname}&certcode=${params.certcode}&item=${params.item}`);
}

export async function deleteItem(params) {
  return request(`/api/testItem/deleteItem?keyno=${params.keyno}`);
}

export async function searchItemList(params) {
  return request(`/api/testItem/searchItemList?cargoname=${params.cargoname}&certCode=${params.certCode}&itemC=${params.itemC}`);
}

export async function addItem(params) {
  return request('/api/testItem/addItem', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateTestStandard(params) {
  return request('/api/TestStandard/updateTestStandard', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function addTestStandard(params) {
  return request('/api/TestStandard/addTestStandard', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function deleteTestStandard(params) {
  return request(`/api/TestStandard/deleteTestStandard?keyno=${params.keyno}`);
}

export async function updateItem(params) {
  return request('/api/testItem/updateItem', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
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


