import request from '@/utils/request';
import { stringify } from 'qs';

export async function getAllReports(params) {
  return request(`/api/report/getAllReports`,{
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
export async function getRecordList(params) {
  return request(`/api/recordinfo/get_recordList?source=${params.source}`,{
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function getRecordInfo(params) {
	return request(`/api/recordinfo/get_recordInfo?reportno=${params.reportno}&source=${params.source}`);
}
export async function getRecord(params) {
  return request(`/api/recordinfo/get_record?recordname=${params.recordname}&reportno=${params.reportno}`);
}
export async function uploadFile(params) {
    return request(`/api/recordinfo/upload`,{
    method: 'POST',
    // headers: { 'Content-Type': 'multipart/form-data;'},
    data:params,
  });
}
export async function deleteRecordInfo(params) {
	return request(`/api/recordinfo/delete_recordInfo?recordname=${params.recordname}&reportno=${params.reportno}`);
}
export async function getInspway(params) {
	return request(`/api/inspway/get_inspway?reportno=${params.reportno}`);
}
export async function addInspway(params) {
	return request(`/api/inspway/add_inspway`,{
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
export async function updateInspway(params) {
  return request(`/api/inspway/update_inspway`,{
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
export async function deleteInspway(params) {
	return request(`/api/inspway/delete_inspway`,{
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
export async function getProject(params) {
	return request(`/api/inspway/get_project?reportno=${params.reportno}`);
}


// post请求 注意 ` 这个符号 不是这种 ’号
export async function getModelSelectName(params) {
  return request(`/api/template/getAllNames`,{
    method: 'POST',
    data:params,
  });
}


export async function downloadPlatFromTemp(params) {
  return request(`/api/template/downloadPlatFromTemp?tempName=${params.tempName}&reportno=${params.reportno}&recordName=${params.recordName}`);
}

