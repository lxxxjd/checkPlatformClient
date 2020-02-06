import request from '@/utils/request';
import { Stringify } from 'qs';

// 数据统计-收入分配-查询
// eslint-disable-next-line import/prefer-default-export
export async function selectListInfosByConditions(params){
  return request('/api/list/selectListInfosByConditions', {
    method: 'post',
    data: {
      ...params,
    },
  });
}

// 数据统计-收入分配-查询总额
export async function selectListInfoTotalByConditions(params){
  return request('/api/list/selectListInfoTotalByConditions', {
    method: 'post',
    data: {
      ...params
    },
  });
}

// 主键查询list
export async function getListBylistno(params) {
  return request(`/api/list/getListBylistno?certcode=${params.certcode}&listno=${params.listno}`);
}

