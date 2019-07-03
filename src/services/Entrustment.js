import request from '@/utils/request';

export async function submitApplicationForm(params) {
  return request('/api/certificate/search', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
