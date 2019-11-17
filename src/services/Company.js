import request from '@/utils/request';
import { stringify } from 'qs';



export async function uploadFile(params) {
    return request(`/api/recordinfo/upload`,{
    method: 'POST',
    // headers: { 'Content-Type': 'multipart/form-data;'},
    data:params,
  });
}

export async function deleteTestBySampleNo(params) {
  return request(`/api/TestInfo/deleteAssign?keyno=${params.keyno}&reportno=${params.reportno}&sampleno=${params.sampleno}`);
}

// post请求 注意 ` 这个符号 不是这种 ’号
export async function getAllUserListByCertCode(params) {
  return request(`/api/user/getAllUserListByCertCode`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function checkUserName(params) {
  return request(`/api/user/check_user?username=${params.username}`);
}



// post请求 注意 ` 这个符号 不是这种 ’号
export async function updateUser(params) {
  return request(`/api/user/updateUser`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//
// post请求 注意 ` 这个符号 不是这种 ’号
export async function addUser(params) {
  return request(`/api/user/addUser`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteUser(params) {
  return request(`/api/user/deleteUser?id=${params.id}`);
}
