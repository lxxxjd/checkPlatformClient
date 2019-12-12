import request from '@/utils/request';
import { stringify } from 'qs';

export async function getAllPremaininfosByCerCode(params) {
  return request(`/api/premaininfo/getAllPremaininfosByCerCode?certCode=${params.certCode}`);
}


export async function getPremaininfo(params) {
  return request(`/api/premaininfo/getPremaininfo?prereportno=${params.prereportno}`);
}

export async function getPreRecord(params) {
  return request(`/api/preRecordInfo/getRecord?prereportno=${params.prereportno}`);
}

export async function getOssPdf(params) {
  return request(`/api/cert_report/get_pdf?osspath=${params.osspath}`);
}