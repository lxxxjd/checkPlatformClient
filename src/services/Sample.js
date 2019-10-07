import request from '@/utils/request';
import { stringify } from 'qs';


// eslint-disable-next-line import/prefer-default-export
export async function getAllSampleRegister(params) {
  return request(`/api/sampleRegister/getAllSampleRegister`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// post请求 注意 ` 这个符号 不是这种 ’号
export async function getSampleRegistersByReportNo(params) {
  return request(`/api/sampleRegister/getSampleRegistersByReportNo`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function addSamleRegister(params) {
  return request(`/api/sampleRegister/addSamleRegister`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteSamleRegister(params) {
  return request(`/api/sampleRegister/deleteSamleRegister`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function selectSampleRegisterByConditions(params) {
  return request(`/api/sampleRegister/selectSampleRegisterByConditions`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function selectSampleByConditionsDestory(params) {
  return request(`/api/sampleRegister/selectSampleByConditionsDestory`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}


// post请求 注意 ` 这个符号 不是这种 ’号
export async function setSampleStatus(params) {
  return request(`/api/sampleRegister/setSampleStatus`,{
    method: 'POST',
    data:params,
  });
}



export async function updateSampleRegisters(params) {
  return request(`/api/sampleRegister/updateSampleRegisters`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
