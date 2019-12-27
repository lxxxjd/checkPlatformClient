import request from '@/utils/request';
import { stringify } from 'qs';

export async function getCNASCheckFourCertCodeListInfo(params) {
  return request(`/api/CNASCheckFourCertCode/getCNASCheckFourCertCodeListInfo`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}


