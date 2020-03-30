import request from '@/utils/request';
import { stringify } from 'qs';
export async function getTestInfo(params) {
  return request(`/api/TestInfo/getTestInfo`,{
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
export async function queryReport(params) {
  return request(`/api/report/getAllReports`,{
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
export async function addTestInfo(params) {
  return request(`/api/TestInfo/addTestInfo`,{
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateTestInfo(params) {
  return request(`/api/TestInfo/updateTestInfo`,{
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function deleteTestBySampleNo(params) {
  return request(`/api/TestInfo/deleteTest?keyno=${params.keyno}`);
}

export async function getAllClientName(params) {
  if(params.content != null){
    return request(`/api/client/getAllClientName?content=${params.content}`);
  }
  return request('/api/client/getAllClientName');
}

export async function getReportLink(params) {
	return request(`/api/report/get_links?reportno=${params.reportno}`);
}

export async function getReport(params) {
  return request(`/api/report/get_report?reportNo=${params.reportno}`);
}

export async function getPriceMaking(params) {
  return request(`/api/pricemaking//getPriceMaking?reportNo=${params.reportno}`);
}

export async function getReportexceptLink(params) {
	return request(`/api/report/get_report_except_link?`,{
    method: 'POST',
      data: params
  });
}

export async function getTestByReportNo(params) {
  return request(`/api/TestInfo/getTestByReportNo?reportno=${params.reportno}`);
}

export async function getCompany(params) {
  return request(`/api/TestInfo/getCompany?certCode=${params.certCode}`);
}
export async function addReportLink(params) {
	const value = params.value;
	return request('/api/report/add_reportlink',{
		method: 'POST',
    	data: value
	});
}

export async function deleteReportLink(params) {
	const value = params.value;
	return request('/api/report/delete_reportlink',{
		method: 'POST',
    	data: value
	});
}
export async function getCheckProject() {
  return request('/api/check_project/get_project');
}


export async function getTestByReportNoAndAssignsort(params) {
  return request(`/api/TestInfo/getTestByReportNoAndAssignsort?reportno=${params.reportno}&assignsort=${params.assignsort}`);
}
