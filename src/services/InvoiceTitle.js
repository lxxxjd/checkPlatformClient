import request from '@/utils/request';
import { stringify } from 'qs';

// getInvoiceTitleList,addInvoiceTitle,updateInvoiceTitle,deleteInvoiceTitle
export async function getInvoiceTitleList(params) {
  return request(`/api/invoiceTitle/getInvoiceTitleList`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function addInvoiceTitle(params) {
  return request(`/api/invoiceTitle/addInvoiceTitle`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateInvoiceTitle(params) {
  return request(`/api/invoiceTitle/updateInvoiceTitle`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteInvoiceTitle(params) {
  return request(`/api/invoiceTitle/deleteInvoiceTitle`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function uploadInvoiceTitle(params) {
  return request(`/api/invoiceTitle/uploadInvoiceTitle`,{
    method: 'POST',
    data:params,
  });
}


export async function getInvoiceTitleById(params) {
  return request(`/api/invoiceTitle/getInvoiceTitleById?keyno=${params.keyno}`);
}
