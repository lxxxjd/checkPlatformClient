import request from '@/utils/request';
import { stringify } from 'qs';

// 查看文件名是否重复
export async function getRepeatRecordName(params) {
  return request(`/api/recordinfo/getRepeatRecordName`,{
    method: 'POST',
    data: params,
  });
}
