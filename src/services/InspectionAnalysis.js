import request from '@/utils/request';

export async function getAllSample(params) {
  return request(`/api/sampleRegister/getAllSample`,{
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
export async function getCompany(params) {
  return request(`/api/TestInfo/getCompany?certCode=${params.certCode}`);
}

export async function getDetails(params) {
	return request(`/api/testdetail/getDetails?reportno=${params.reportno}&sampleno=${params.sampleno}`);
}
export async function getItems(params) {
	return request(`/api/testdetail/getItems?reportno=${params.reportno}&sampleno=${params.sampleno}&cargonameC=${params.cargonameC}`);
}
export async function getStandards(params) {
  return request(`/api/testdetail/getStandards?itemC=${params.itemC}`);
}
export async function getItemNames(params) {
  return request(`/api/testdetail/getItemNames?reportno=${params.reportno}&sampleno=${params.sampleno}&cargonameC=${params.cargonameC}`);
}
export async function addDetail(params) {
  const cargonameC = params.cargonameC;
  delete params.cargonameC;
  return request(`/api/testdetail/addDetail?cargonameC=${cargonameC}`,{
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
