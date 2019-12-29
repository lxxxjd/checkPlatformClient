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

export async function getParent(params) {
  return request(`/api/company/getParent?certCode=${params.certCode}`);
}

export async function updateCompany(params) {
  return request(`/api/company/updateCompany`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function uploadUserSeal(params) {
  return request(`/api/user/upload_sign`,{
    method: 'POST',
    data:params,
  });
}

export async function uploadSeal(params) {
  return request(`/api/company/uploadSeal`,{
    method: 'POST',
    data:params,
  });
}

export async function uploadDocumentHead(params) {
  return request(`/api/company/uploadDocumentHead`,{
    method: 'POST',
    data:params,
  });
}

export async function getUrl(params) {
  return request(`/api/cert_report/get_pdf?osspath=${params.url}`);
}

export async function getCompany(params) {
  return request(`/api/company/getCompany?certCode=${params.certCode}`);
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
  return request(`/api/user/deleteUser`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 部门管理
export async function getDepartmentList(params) {
  return request(`/api/department/get_departmentList`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function addDepartment(params) {
  return request(`/api/department/add_department`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateDepartment(params) {
  return request(`/api/department/update_department`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteDepartment(params) {
  return request(`/api/department/delete_department`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}



