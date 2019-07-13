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
export async function queryCustomers(params) {
  return request(`/api/task_info/get_all_info`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// post请求 注意 ` 这个符号 不是这种 ’号
export async function dealTask(params) {
  const param = params.params;
  return request(`/api/task_info/deal_task`,{
    method: 'POST',
    data:param,
  });
}

// post请求 注意 ` 这个符号 不是这种 ’号
export async function updateTask(params) {
  return request(`/api/task_info/update_task`,{
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

