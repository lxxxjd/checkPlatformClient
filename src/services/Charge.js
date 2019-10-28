import request from '@/utils/request';
import { stringify } from 'qs';


export async function getAllList(params) {
  return request(`/api/list/getAllList`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function getReports(params) {
  return request(`/api/list/getReports`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function addList(params) {
  return request(`/api/list/addList`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function deleteBylistno(params) {
  return request(`/api/list/deleteBylistno`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function getReportListBylistno(params) {
  return request(`/api/list/getReportListBylistno`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updatePriceMaking(params) {
  return request(`/api/pricemaking/updatePriceMaking`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function getPriceMaking(params) {
  return request(`/api/pricemaking/getPriceMaking?reportNo=${params.reportNo}`);
}

export async function getReportPriceMaking(params) {
  return request(`/api/pricemaking/getReportPriceMaking`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function passListFiction(params) {
  return request(`/api/list/updateList`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
//

// 成本支出
export async function getCosts(params) {
  return request(`/api/cost/getCosts`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 成本删除
export async function deleteCost(params) {
  return request(`/api/cost/deleteCost`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


// 成本删除
export async function updateCost(params) {
  return request(`/api/cost/updateCost`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


// 成本支出
export async function getAllCost(params) {
  return request(`/api/cost/getAllCost`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}



// 成本支出
export async function addCost(params) {
  return request(`/api/cost/addCost`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}












