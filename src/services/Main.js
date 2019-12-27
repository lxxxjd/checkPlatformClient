import request from '@/utils/request';
import { stringify } from 'qs';

export async function getReportNumDay(params) {
  return request(`/api/homepage/getReportNumDay?certcode=${params.certcode}`);
}

export async function getBillTotalDay(params) {
  return request(`/api/homepage/getBillTotalDay?certcode=${params.certcode}`);
}

export async function getBillTotalMonth(params) {
  return request(`/api/homepage/getBillTotalMonth?certcode=${params.certcode}`);
}

export async function getBillTotalYear(params) {
  return request(`/api/homepage/getBillTotalYear?certcode=${params.certcode}`);
}

export async function getPayTotalYear(params) {
  return request(`/api/homepage/getPayTotalYear?certcode=${params.certcode}`);
}

export async function getPerTask(params) {
  return request(`/api/homepage/getPerTask?inspman=${params.inspman}&certcode=${params.certcode}`);
}

export async function getPerApprove(params) {
  return request(`/api/homepage/getPerApprove?approver=${params.approver}`);
}

export async function getTotalPay(params) {
  return request(`/api/homepage/getTotalPay?username=${params.username}&certcode=${params.certcode}`);
}