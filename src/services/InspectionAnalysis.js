import request from '@/utils/request';

export async function getCompany(params) {
  return request(`/api/TestInfo/getCompany?certCode=${params.certCode}`);
}