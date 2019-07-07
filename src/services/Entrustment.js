import request from '@/utils/request';
import { stringify } from 'qs';

export async function submitApplication(params) {
	const inspway = params.inspway.join(' ');
	const certstyle = params.certstyle.join('');
    params.inspway = inspway;
    params.certstyle = certstyle;
    console.log(params.certstyle);
    console.log(params.inspway);
  	return request('/api/report/add_report?', {
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

export async function getAllClientName() {
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

export async function cancelReportItem(params) {
  return request(`/api/report/delete_report`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

