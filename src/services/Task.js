import request from '@/utils/request';
import { stringify } from 'qs';


// post请求 注意 ` 这个符号 不是这种 ’号
export async function queryAllTask(params) {
  return request(`/api/task//getAllTask`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// post请求 注意 ` 这个符号 不是这种 ’号
export async function queryUser2(params) {
  return request(`/api/test/user?${params}`, {
    method: "POST"
  });
}
