import request from '@/utils/request';
import { stringify } from 'qs';

// 数据统计-支出负担-查询
// eslint-disable-next-line import/prefer-default-export
export async function selectCostListsByConditions(params){
  return request('/api/costlist/selectCostListsByConditions', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 数据统计-支出负担-查询总额
export async function selectCostListTotalByConditions(params){
  return request('/api/costlist/selectCostListTotalByConditions', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
