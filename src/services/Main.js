import request from '@/utils/request';
import { stringify } from 'qs';

export async function getReportNumDay(params) {
  return request(`/api/homepage/getReportNumDay`);
}

export async function getBillTotalDay(params) {
  return request(`/api/homepage/getBillTotalDay`);
}

export async function getBillTotalMonth(params) {
  return request(`/api/homepage/getBillTotalMonth`);
}

export async function getBillTotalYear(params) {
  return request(`/api/homepage/getBillTotalYear`);
}

export async function getPayTotalYear(params) {
  return request(`/api/homepage/getPayTotalYear`);
}

export async function getPerTask(params) {
  return request(`/api/homepage/getPerTask?inspman=${params.inspman}&certcode=${params.certcode}`);
}

export async function getPerApprove(params) {
  return request(`/api/homepage/getPerApprove?approver=${params.approver}`);
}