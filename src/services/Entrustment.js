import request from '@/utils/request';
import { stringify } from "qs";

export async function submitApplication(params) {
	const inspway = params.inspway.join(',');
	const certstyle = params.certstyle.join('');
    params.inspway = inspway;
    params.certstyle = certstyle;
    console.log(params.certstyle);
    console.log(params.inspway);
  	return request('/api/report/add_report?', {
    	method: 'POST',
    	data: {
      	...params,
      	method: 'post',
    	},
  	});
}
