import request from '@/utils/request';

export async function submitApplication(params) {
  return request('/api/Entrustment/add', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}