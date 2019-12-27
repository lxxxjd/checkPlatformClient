import request from '@/utils/request';
import { stringify } from 'qs';


// addSurveryStandard,deleteSurveyStandard,getSurveyStandard，updateSurveystandard

export async function updateSurveystandard(params) {
  return request(`/api/surveystandard/updateSurveystandard`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addSurveryStandard(params) {
  return request(`/api/surveystandard/addSurveryStandard`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteSurveyStandard(params) {
  return request(`/api/surveystandard/deleteSurveyStandard`,{
    method: 'POST',
    data: params,
  });
}

// deleteInstrument
export async function getSurveyStandard(params) {
  return request(`/api/surveystandard/getSurveyStandard`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

