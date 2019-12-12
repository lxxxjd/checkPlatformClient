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

export async function reviewCertFile(params) {
    return request(`/api/cert_report/reviewCertFile`,{
    method: 'POST',
    // headers: { 'Content-Type': 'multipart/form-data;'},
    data:params,
  });
}

export async function sealCertFile(params) {
    return request(`/api/cert_report/sealCertFile`,{
    method: 'POST',
    // headers: { 'Content-Type': 'multipart/form-data;'},
    data:params,
  });
}

export async function makeCertFile(params) {
  return request(`/api/cert_report/makeCertFile`,{
    method: 'POST',
    data:params,
  });
}




export async function deleteCertFile(params) {
    return request(`/api/cert_report/deleteCertFile?keyno=${params.keyno}`);
}


// 签署界面的品质信息
export async function getSampleDetail(params) {
  return request(`/api/sampleRegister/getSampleDetail?reportno=${params.reportno}`);
}


// 签署界面的检验信息
export async function getCheckResult(params) {
  return request(`/api/checkResult/getCheckResult?reportno=${params.reportno}`);
}


// 签署界面的关联委托的检验信息
export async function getCheckResultForLink(params) {
  return request(`/api/report/get_checkResult?reportno=${params.reportno}`);
}



// 签署界面的关联委托的品质信息
export async function getSampleDetailForLink(params) {
  return request(`/api/report/get_sampleDetail?reportno=${params.reportno}`);
}


// 签署界面的关联委托的品质信息
export async function getRecordInfo(params) {
  return request(`/api/recordinfo/get_recordinfo_source?reportno=${params.reportno}`);
}

// 签署界面的关联委托的品质信息
export async function getPdfUrl(params) {
  return request(`/api/recordinfo/get_pdf_url?id=${params.id}`);
}

// 签署界面的关联委托的品质信息
export async function getPdfByOssPath(params) {
  return request(`/api/cert_report/get_pdf?osspath=${params.osspath}`);
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


export async function convertWordToPdf(params) {
  return request('/api/cert_report/convertWordToPdf', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function getAllUserListByCertCode(params) {
  return request('/api/user/getAllUserListByCertCode', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}



export async function getSignature(params) {
  return request(`/api/getSignature?${stringify(params.params)}`);
}



export async function undoCert(params) {
  return request(`/api/cert_report/undo_cert?keyno=${params.keyno}`);
}



export async function getMainInfo(params) {
  return request(`/api/mainReport/getmainInfo?reportno=${params.reportno}`);
}


export async function downloadQualityTemp(params) {
  return request('/api/template/download_quality_temp', {
    method: 'POST',
    data:params,
  });
}


