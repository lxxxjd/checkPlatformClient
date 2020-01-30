import request from '@/utils/request';
import { stringify } from 'qs';

export async function submitApplication(params) {
  if(params.certstyle !== null && params.certstyle !== undefined){
    const certstyle = params.certstyle.join('');
    params.certstyle = certstyle;
  }
  if(params.cnasProject !== null && params.cnasProject !== undefined){
    const cnasProject = params.cnasProject.join('');
    params.cnasProject = cnasProject;
  }
  if(params.section !== null && params.section !== undefined){
    const section = params.section.join(' ');
    params.section = section;
  }
  const inspway = params.inspway.join(' ');
  params.inspway = inspway;
	return request('/api/report/add_report', {
  	method: 'POST',
  	data: {
    	...params,
    	method: 'post',
  	},
	});
}



export async function updateReport(params) {
  console.log(params);
  if(params.certstyle !== null && params.certstyle !== undefined){
    const certstyle = params.certstyle.join(' ');
    params.certstyle = certstyle;
  }
  if(params.cnasProject !== null && params.cnasProject !== undefined){
    const cnasProject = params.cnasProject.join(' ');
    params.cnasProject = cnasProject;
  }
  if(params.section !== null && params.section !== undefined){
    const section = params.section.join(' ');
    params.section = section;
  }
  const inspway = params.inspway.join(' ');
  params.inspway = inspway;
  return request('/api/report/update_report', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function addConfigorAuthority(params) {
  return request(`/api/ConfigorAuthority/addConfigorAuthority`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function getDepartmentList(params) {
  return request(`/api/department/get_departmentList`,{
    method: 'POST',
    data: {
      ...params,
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

export async function getCustomInfos(params) {
  return request(`/api/Customs/getCustomInfos`);
}

export async function queryReport(params) {
  return request(`/api/report/get_report?reportNo=${params}`);
}

export async function getContacts(params) {
  return request(`/api/contact/getContacts?companyName=${params.value}`);
}
export async function getAllClientName(params) {
  if(params.content != null){
    return request(`/api/contact/getAllContacts?content=${params.content}`);
  }
  return request('/api/contact/getAllContacts');
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

export async function getCheckProject(params) {
  return request(`/api/check_project/get_project?certCode=${params.certCode}`);
}

export async function getCnasInfo(params) {
  return request(`/api/cnas/getCnasInfo?checkCode=${params.checkCode}`);
}
export async function getCnasCheckInfo(params) {
  return request(`/api/cnas/getCnasCheckInfo?checkCode=${params.checkCode}&certcode=${params.certCode}`);
}

export async function getCargos(params) {
  return request(`/api/cargo/get_cargos`);
}
export async function searchCargos(params) {
  return request(`/api/cargo/search_cargos?value=${params.value}`);
}
export async function cancelReportItem(params) {
  return request(`/api/report/delete_report`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 报关号查重
export async function getRepeatCustomsNo(params) {
  return request(`/api/report/getRepeatCustomsNo?customsNo=${params.customsNo}`);
}


// 工商接口
export async function getBusiness(params) {
  return request(`/api/business/getBusiness?name=${params.name}`);
}
