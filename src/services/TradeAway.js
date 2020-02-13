import request from '@/utils/request';
import { stringify } from 'qs';



export async function getTradeAwayList(params) {
  return request(`/api/trade_away/getTradeAwayList`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addTradeAway(params) {
  return request(`/api/trade_away/addTradeAway`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateTradeAway(params) {
  return request(`/api/trade_away/updateTradeAway`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteTradeAway(params) {
  return request(`/api/trade_away/deleteTradeAway`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

