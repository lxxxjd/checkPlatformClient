import request from '@/utils/request';
import { stringify } from 'qs';

export async function submitApplication(params) {
	const inspway = params.inspway.join(' ');
	const certstyle = params.certstyle.join('');
  const cnasProject = params.cnasProject.join(' ');
  params.inspway = inspway;
  params.certstyle = certstyle;
  params.cnasProject = cnasProject;
	return request('/api/report/add_report', {
  	method: 'POST',
  	data: {
    	...params,
    	method: 'post',
  	},
	});
}
export async function updateReport(params) {
  const inspway = params.inspway.join(' ');
  const certstyle = params.certstyle.join('');
  const cnasProject = params.cnasProject.join(' ');
  params.inspway = inspway;
  params.certstyle = certstyle;
  params.cnasProject = cnasProject;
  return request('/api/report/update_report', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function queryAllReports(params) {
  return request(`/api/report/getAllReports`,{
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function queryAllReportsByFilter(params) {
  return request(`/api/report/filter_report`,{
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function queryReport(params) {
  return request(`/api/report/get_report?reportNo=${params}`);
}

export async function getContacts(params) {
  return request(`/api/contact/getContacts?companyName=${params.value}`);
}
export async function getAllClientName(params) {
  if(params.content != null){
    return request(`/api/client/getAllClientName?content=${params.content}`);
  }
  return request('/api/client/getAllClientName');
}

export async function getAllBusinessSort() {
  return request('/api/business_sort/get_sort');
}

export async function getAllBusinessSource() {
  return request('/api/business_source/get_source');
}

export async function getTradeWay() {
  return request('/api/trade_away/get_ways');
}

export async function getCheckProject() {
  return request('/api/check_project/get_project');
}

export async function getCnasInfo(params) {
  return request(`/api/cnas/getCnasInfo?checkCode=${params.checkCode}`);
}
export async function getCnasCheckInfo(params) {
  return request(`/api/cnas/getCnasCheckInfo?subdomaincode=${params.subdomaincode}`);
}

export async function getCargos(params) {
  return request(`/api/cargo/get_cargos?certCode=${params.certCode}`);
}
export async function searchCargos(params) {
  return request(`/api/cargo/search_cargos?certCode=${params.certCode}&value=${params.value}`);
}
export async function cancelReportItem(params) {
  return request(`/api/report/delete_report`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

