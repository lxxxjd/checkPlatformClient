// json序列化的工具
import { stringify } from "qs";
// ant 自己封装好的发送ajax请求的工具
import request from "@/utils/request";


export async function getCertReports(params) {
  // stringify这个将json序列化 比如 {"a"：1，"b":2} 转换成 a=1&b=2
  return request(`/api/cert_report/getCertReports`,{
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
export async function getCertFiles(params) {
  return request(`/api/cert_report/getCertFiles?reportno=${params.reportno}`);
}

export async function uploadCertFile(params) {
    return request(`/api/cert_report/uploadCertFile`,{
    method: 'POST',
    // headers: { 'Content-Type': 'multipart/form-data;'},
    data:params,
  });
}
export async function signCertFile(params) {
    return request(`/api/cert_report/signCertFile`,{
    method: 'POST',
    // headers: { 'Content-Type': 'multipart/form-data;'},
    data:params,
  });
}

export async function deleteCertFile(params) {
    return request(`/api/cert_report/deleteCertFile?keyno=${params.keyno}`);
}




// get请求 注意 ` 这个符号 不是这种 ’号
export async function queryUser1(params) {
  // stringify这个将json序列化 比如 {"a"：1，"b":2} 转换成 a=1&b=2
  return request(`/api/test/user?${stringify(params)}`);
}

// post请求 注意 ` 这个符号 不是这种 ’号
export async function queryUser2(params) {
  return request(`/api/test/user?${params}`, {
    method: "POST"
  });
}


// post请求 注意 ` 这个符号 不是这种 ’号
export async function queryCertificate2(params) {
  return request(`/api/certificate/list?${params}`, {
    method: "POST"
  });
}

export async function queryCertificate(params) {
  return request(`/api/certificate/list?${stringify(params)}`);
}

export async function addCertificate(params) {
  return request('/api/certificate/add', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
export async function updateCertificate(params = {}) {
  return request(`/api/certificate/update?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}



export async function removeCertificate(params) {
  return request('/api/certificate/delete', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}


export async function searchCertificate(params) {
  return request('/api/certificate/search', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}



export async function getSignature(params) {
  console.log(`/api/getSignature?${stringify(params.params)}`)
  return request(`/api/getSignature?${stringify(params.params)}`);
}



