import request from '@/utils/request';
import { stringify } from 'qs';

export async function addCheckResult(params) {
  const inspman = params.inspman.join('|');
  const standard = params.standard.join('|');
  const instrument = params.instrument.join('|');
  params.inspman = inspman;
  params.standard = standard;
  params.instrument = instrument;
  return request(`/api/checkResult/addCheckResult`,{
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
export async function updateCheckResult(params) {
  const inspman = params.inspman.join('|');
  const standard = params.standard.join('|');
  const instrument = params.instrument.join('|');
  params.inspman = inspman;
  params.standard = standard;
  params.instrument = instrument;
  return request(`/api/checkResult/updateCheckResult`,{
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
export async function deleteCheckResult(params) {
  return request(`/api/checkResult/deleteCheckResult?keyno=${params.keyno}`);
}


export async function getInstrument(params) {
  return request(`/api/instrument/getInstrument`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function getStandard(params) {
  return request(`/api/surveystandard/getSurveyStandard`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function getProject(params) {
  return request(`/api/inspway/get_project?reportno=${params.reportno}`);
}

export async function getCheckResult(params) {
  return request(`/api/checkResult/getCheckResult?reportno=${params.reportno}`);
}

export async function getTaskByReportNoAndInspway(params) {
  return request(`/api/task/getTaskByReportNoAndInspway?reportNo=${params.reportno}&inspway=${params.inspway}`);
}
