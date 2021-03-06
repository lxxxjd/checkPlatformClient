import request from '@/utils/request';
import { stringify } from 'qs';

export async function submitApplication(params) {

  if (params.inspplace1 !== undefined && params.inspplace1 !== null ) {
    params.inspplace1 = params.inspplace1[2];
  }
  if (params.customsName !== undefined && params.customsName !== null ) {
    params.customsName = params.customsName[1];
  }

  if(params.certstyle !== null && params.certstyle !== undefined){
    if(params.certstyle.length===1){
      params.certstyle = params.certstyle[0];
    }else if(params.certstyle.length===2){
      params.certstyle = params.certstyle[1];
    }
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
  console.log(params)

  return request('/api/report/add_report', {
  	method: 'POST',
  	data: {
    	...params,
  	},
	});
}



export async function updateReport(params) {



  if (params.inspplace1 !== undefined && params.inspplace1 !== null ) {
    params.inspplace1 = params.inspplace1[2];
  }
  if (params.customsName !== undefined && params.customsName !== null ) {
    params.customsName = params.customsName[1];
  }

  if(params.certstyle !== null && params.certstyle !== undefined){
    if(params.certstyle.length===1){
      params.certstyle = params.certstyle[0];
    }else if(params.certstyle.length===2){
      params.certstyle = params.certstyle[1];
    }
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

  console.log(params);

  return request('/api/report/update_report', {
    method: 'POST',
    data: {
      ...params,
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

export async function getAllBusinessSort(params) {
  return request(`/api/business_sort/get_sort?certCode=${params.certCode}`);
}

export async function getAllBusinessSource(params) {
  return request(`/api/business_source/get_source?certCode=${params.certCode}`);
}

export async function getTradeWay(params) {
  return request(`/api/trade_away/get_ways?certCode=${params.certCode}`);
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

// 查详细地址
export async function getPortList(params) {
  return request(`/api/port/getPortList`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function searchPortForEntrustment(params) {
  return request(`/api/port/searchPortForEntrustment`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function searchByKindValue(params) {
  return request(`/api/port/searchByKindValue`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function searchPlaceByPlaceCode(params) {
  return request(`/api/port/searchPlaceByPlaceCode`,{
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

export async function getPriceMaking(params) {
  return request(`/api/pricemaking/getPriceMaking?reportNo=${params.reportNo}`);
}

