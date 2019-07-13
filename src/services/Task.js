import request from '@/utils/request';
import { stringify } from 'qs';


// post请求 注意 ` 这个符号 不是这种 ’号
export async function queryAllTaskAndCustomers(params) {
  return request(`/api/task/getAllTaskAndCustomers`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// post请求 注意 ` 这个符号 不是这种 ’号
export async function queryAllTaskAndInspects(params) {
  return request(`/api/task/getAllTaskAndInspects`,{
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
export async function queryInspects(params) {
  return request(`/api/task_info/get_all_inspect`,{
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
export async function dealnspect(params) {
  const param = params.params;
  return request(`/api/task_info/deal_inspect`,{
    method: 'POST',
    data:param,
  });
}

// post请求 注意 ` 这个符号 不是这种 ’号
export async function updateInspect(params) {
  return request(`/api/task_info/update_inspect`,{
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

