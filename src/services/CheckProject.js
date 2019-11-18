import request from '@/utils/request';
import { stringify } from 'qs';

// 检验项目管理
export async function getCheckProjectList(params) {
  return request(`/api/check_project/get_checkProjectList`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function addCheckProject(params) {
  return request(`/api/check_project/add_checkProject`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateCheckProject(params) {
  return request(`/api/check_project/update_checkProject`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteCheckProject(params) {
  return request(`/api/check_project/delete_checkProject`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}
