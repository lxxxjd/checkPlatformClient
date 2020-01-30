import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Select,
  Modal,
  Radio,
  Table,
  DatePicker,
  notification,
  Upload,
  Icon,
  message
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './company.less';
import moment from 'moment'

@Form.create()
@connect(({ company, loading }) => ({
  company,
  loading: loading.models.company,
}))
class CompanyInfo extends PureComponent {

	state = {
		company:{},
		parents:[],
	};
	componentDidMount() {
	    const {
	    	dispatch ,
	    	form
	    } = this.props;
	    const user = JSON.parse(localStorage.getItem("userinfo"));
	    dispatch({
			type: 'company/getCompany',
			payload:{
			 	certCode : user.certCode,
			},
			callback:(response)=>{
				if(response.code === 200){
					this.setState({company:response.data});
					form.setFieldsValue({
						'namee':response.data.namee,
						'adres':response.data.adres,
						'account':response.data.account,
						'bank' : response.data.bank,
						'belongto': response.data.belongto,
						'cocode':response.data.cocode,
					});
				}
			}
    	});
    	dispatch({
			type: 'company/getParent',
			payload:{
			 	certCode : user.certCode,
			},
			callback:(response)=>{
				if(response.code === 200){
					this.setState({parents:response.data});
				}
			}
    	});
	};

	handleSubmit = () =>{
	    const {
	      form,
	      dispatch,
	    } = this.props;
	    const {validateFieldsAndScroll} = form;
	    let company  = this.state.company;
	    validateFieldsAndScroll((error, values) => {
	      if (!error) {
	        // submit the values
	        company.namee = form.getFieldValue('namee');
	       	company.adres = form.getFieldValue('adres');
	        company.account = form.getFieldValue('account');
	        company.bank = form.getFieldValue('bank');
	        company.belongto = form.getFieldValue('belongto');
	       	company.cocode = form.getFieldValue('cocode');
	        dispatch({
	          type: 'company/updateCompany',
	          payload: {
	          	...company,
	          },
	          callback: (response) => {
	            if (response.code === 200) {
	              notification.open({
	                message: '修改成功',
	              });
	              this.componentDidMount();
	            } else {
	              notification.open({
	                message: '添加失败',
	                description: response.data,
	              });
	            }
	          }
	        });
	      }
	    });
	};
 	render() {
 		const { getFieldDecorator } = this.props.form;
 		const formItemLayout = {
	      labelCol: { span: 6 },
	      wrapperCol: { span: 14 },
	    };
	    const { company ,parents} = this.state;
	    const parentsOptions = parents.map(d => <Option key={d.certcode} value={d.certcode}>{d.namec}</Option>);
 		return(
 			<Card>
	 			<Form {...formItemLayout} >
	 				<Form.Item label="公司名称">
						<span className="ant-form-text">{company.namec}</span>
			        </Form.Item>
			        <Form.Item label="英文名称">
			          {getFieldDecorator('namee', {
			            rules: [
			              {
			                required: true,
			                message: '请输入英文名',
			              },
			            ],
			          })(<Input />)}
			        </Form.Item>
			       	<Form.Item label="地址">
			          {getFieldDecorator('adres', {
			            rules: [
			              {
			                required: true,
			                message: '请输入地址',
			              },
			            ],
			          })(<Input />)}
			        </Form.Item>
			        <Form.Item label="银行账户">
			          {getFieldDecorator('account', {
			            rules: [
			              {
			                required: true,
			                message: '请输入银行账户',
			              },
			            ],
			          })(<Input />)}
			        </Form.Item>
			        <Form.Item label="社会统一信用代码">
			          {getFieldDecorator('cocode', {
			            rules: [
			              {
			                required: true,
			                message: '请输入社会统一信用代码',
			              },
			            ],
			          })(<Input />)}
			        </Form.Item>
			        <Form.Item label="开户行">
			          {getFieldDecorator('bank', {
			            rules: [
			              {
			                required: true,
			                message: '请输入开户行',
			              },
			            ],
			          })(<Input />)}
			        </Form.Item>
			        <Form.Item
	                  label="母公司"
	                >
	                  {getFieldDecorator('belongto', {
	                  })(
	                    <Select
	                      placeholder="请选择母公司"
	                      filterOption={false}
	                    >
	                      {parentsOptions}
	                    </Select>
	                  )}
	                </Form.Item>
			        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
						<Button type="primary" onClick={this.handleSubmit}>
					  	保存
						</Button>
			        </Form.Item>
			    </Form>
		    </Card>
 		);
 	}
}

export default CompanyInfo;
